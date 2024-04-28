const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://harshitjaglan78:H%40905090j@cluster0.sh3mmu5.mongodb.net/Aggie"
);

const userSchema = mongoose.Schema({
  email: String,
  password: String,
});

const clockSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  events: [
    {
      type: { type: String, enum: ["clock-in", "clock-out"] },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const adminSchema = mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
const Clock = mongoose.model("Clock", clockSchema);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = { User, Clock, Admin };
