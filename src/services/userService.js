const { User } = require("../models");

exports.createUser = async ({ name }) => {
  const user = await User.create({ name });

  return user;
};
