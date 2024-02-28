const mongoose = require("mongoose");

//user schema model

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    p5Balance: { type: Number, default: 100 },
    rewardsBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("users", userSchema);
