const { catchAsync } = require("../utils/functions");
const { createResponse } = require("../utils/response");
const userService = require("../services/userService");

exports.createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  return createResponse(req, res, user);
});
