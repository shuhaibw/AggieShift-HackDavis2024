const express = require("express");

const router = express.Router();
const userRouter = require("./user.js");
const adminRouter = require("./admin.js");

router.use("/user", userRouter);
router.use("/admin", adminRouter);

module.exports = router;
