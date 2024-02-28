const mongoose = require("mongoose");

//rewards schema model

const rewardSchema = new mongoose.Schema(
  {
    points: { type: Number },
    givenBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    givenTo: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = Rewards = mongoose.model("rewards", rewardSchema);
