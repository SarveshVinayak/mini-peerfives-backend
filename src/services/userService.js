const { ERROR_MESSAGES, STATUS_CODES } = require("../config/constants");
const { User, Rewards } = require("../models");
const { AuthFailedError } = require("../utils/errors");
const { paginationOptions } = require("../utils/functions");

exports.userList = async ({ page, limit }) => {
  const users = await User.find({}, {}, paginationOptions(page, limit));

  return users;
};

exports.createUser = async ({ name }) => {
  const user = await User.create({ name });

  return user;
};

exports.getUser = async ({ id }) => {
  const user = await User.findById(id).lean();

  if (!user) {
    throw new AuthFailedError(
      ERROR_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  return user;
};

exports.editUser = async ({ id }, { name }) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { name } },
    { new: true, lean: true }
  ).lean();

  if (!user) {
    throw new AuthFailedError(
      ERROR_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  return user;
};

exports.rewardsUserList = async ({ id }) => {
  const users = await User.find({ _id: { $ne: id } });

  return users;
};

exports.giveReward = async ({ points, _id }, { id }) => {
  const user = await User.findOneAndUpdate(
    { _id, p5Balance: { $gte: points } },
    { $inc: { p5Balance: -points } }
  ).lean();

  if (!user) {
    throw new AuthFailedError(
      ERROR_MESSAGES.INSUFFICIENT_BALANCE,
      STATUS_CODES.ACTION_FAILED
    );
  }

  const user1 = await User.findByIdAndUpdate(id, {
    $inc: { rewardsBalance: points },
  }).lean();

  if (!user1) {
    throw new AuthFailedError(
      ERROR_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  await Rewards.create({
    points,
    givenBy: _id,
    givenTo: id,
  });
};

exports.rewardHistory = async ({ id }) => {
  const [rewards, user] = await Promise.all([
    Rewards.find({ givenTo: id }).populate([
      { path: "givenTo", select: ["name"] },
      { path: "givenBy", select: ["name"] },
    ]),
    User.findById(id).lean(),
  ]);

  if (!user) {
    throw new AuthFailedError(
      ERROR_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }
  return { rewards, user };
};

exports.p5History = async ({ id }) => {
  const [rewards, user] = await Promise.all([
    Rewards.find({ givenBy: id }).populate([
      { path: "givenTo", select: ["name"] },
      { path: "givenBy", select: ["name"] },
    ]),
    User.findById(id).lean(),
  ]);

  if (!user) {
    throw new AuthFailedError(
      ERROR_MESSAGES.USER_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  return { rewards, user };
};

exports.deleteP5 = async ({ id }) => {
  const reward = await Rewards.findById(id).lean();

  if (!reward) {
    throw new AuthFailedError(
      ERROR_MESSAGES.REWARD_NOT_FOUND,
      STATUS_CODES.ACTION_FAILED
    );
  }

  await Promise.all([
    Rewards.deleteOne({ _id: id }),
    User.updateOne(
      {
        _id: reward.givenBy,
      },
      { $inc: { p5Balance: reward.points } }
    ),
    User.updateOne(
      {
        _id: reward.givenTo,
      },
      { $inc: { rewardsBalance: -reward.points } }
    ),
  ]);
};
