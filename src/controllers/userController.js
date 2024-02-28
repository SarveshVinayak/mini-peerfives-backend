const { catchAsync } = require("../utils/functions");
const { createResponse, successResponse } = require("../utils/response");
const userService = require("../services/userService");

exports.userList = catchAsync(async (req, res) => {
  const users = await userService.userList(req.query);
  return createResponse(req, res, users);
});

exports.createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  return createResponse(req, res, user);
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await userService.getUser(req.params);
  return successResponse(req, res, user);
});

exports.editUser = catchAsync(async (req, res) => {
  const user = await userService.editUser(req.params, req.body);
  return successResponse(req, res, user);
});

exports.rewardsUserList = catchAsync(async (req, res) => {
  const users = await userService.rewardsUserList(req.params);
  return createResponse(req, res, users);
});

exports.giveReward = catchAsync(async (req, res) => {
  await userService.giveReward(req.body, req.params);
  return successResponse(req, res);
});

exports.rewardHistory = catchAsync(async (req, res) => {
  const history = await userService.rewardHistory(req.params);
  return successResponse(req, res, history);
});

exports.p5History = catchAsync(async (req, res) => {
  const history = await userService.p5History(req.params);
  return successResponse(req, res, history);
});

exports.deleteP5 = catchAsync(async (req, res) => {
  await userService.deleteP5(req.params);
  return successResponse(req, res);
});
