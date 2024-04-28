const express = require("express");

const userRouter = express.Router();
const zod = require("zod");
const { User, Clock } = require("../db.js");

const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});
const signBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signBody.safeParse(req.body);
  if (!success) {
    return res.status(400).send("Invalid email or password");
  }
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  const userId = user._id;
  if (!user) {
    return res.status(400).send("Invalid email or password");
  } else {
    return res.status(200).send(user);
  }
});

userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body); // destructuring
  if (!success)
    return res.status(411).json({ message: "Email taken/wrong inouts" });

  const exsistingUser = await User.findOne({
    email: body.email,
  });
  if (exsistingUser) {
    return res.status(411).json({ messsage: "Email taken" });
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
  });

  const userId = user._id;

  await Clock.create({
    userId, // since property is same
  });

  return res.status(200).send(user);
});

userRouter.put("/clockIn", async (req, res) => {
  const email = req.headers.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(411).json({ messsage: "wrong in email" });

  //   const id = new user._id();
  const clockRecord = await Clock.findOne({ userId: user._id });

  if (!clockRecord)
    return res.status(411).json({ messsage: "wrong in record" });

  if (clockRecord) {
    clockRecord.events.push({
      type: "clock-in",
    });
    await clockRecord.save();
    return res.status(200).send(clockRecord);
  } else {
    return res.status(411).json({ messsage: "wrong in clockin" });
  }
});

userRouter.put("/clockOut", async (req, res) => {
  const email = req.headers.email;
  const user = await User.findOne({ email });
  if (!user) return res.status(411).json({ messsage: "wrong in email" });

  //   const id = new user._id();
  const clockRecord = await Clock.findOne({ userId: user._id });

  if (!clockRecord)
    return res.status(411).json({ messsage: "wrong in record" });

  if (clockRecord) {
    clockRecord.events.push({
      type: "clock-out",
    });
    await clockRecord.save();
    return res.status(200).send(clockRecord);
  } else {
    return res.status(411).json({ messsage: "wrong in clockin" });
  }
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const user = await User.findOne({ email: filter });
  const list = await Clock.findOne({ userId: user._id });

  console.log(list);
  res.send(list);
});

module.exports = userRouter;
