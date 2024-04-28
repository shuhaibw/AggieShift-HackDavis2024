const express = require("express");

const adminRouter = express.Router();
const zod = require("zod");
const { Admin, User } = require("../db.js");

const signBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

adminRouter.post("/signin", async (req, res) => {
  const { success } = signBody.safeParse(req.body);
  if (!success) {
    return res.status(400).send("Invalid email or password");
  }
  const admin = await Admin.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!admin) {
    return res.status(400).send("Invalid email or password");
  }
  return res.status(200).send(admin);
});
adminRouter.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "email");
    const emails = users.map((admin) => admin.email);
    return res.status(200).json(emails);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = adminRouter;
