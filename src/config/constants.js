const Joi = require("joi");
const { objectId } = require("../validations/customValidation");

exports.JOI = {
  LIMIT: Joi.number().default(50),
  PAGE: Joi.number().default(0),
  OBJECTID: Joi.string().custom(objectId).required(),
};

exports.SUCCESS_MESSAGES = {
  SUCCESS: "Success",
};

exports.ERROR_MESSAGES = {
  NOT_FOUND: "Not found",
  VALIDATION_FAILED: "Validation Failed, Kindly check your parameters",
  SERVER_ERROR: "Something went wrong, Please try again.",
  USER_NOT_FOUND: "User not found",
  INSUFFICIENT_BALANCE: "Insufficient P5 Balance.",
  REWARD_NOT_FOUND: "Reward not found",
};

exports.STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  ACTION_PENDING: 202,
  ACTION_COMPLETE: 204,

  VALIDATION_FAILED: 400,
  ACTION_FAILED: 400,
  AUTH_FAILED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,

  ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};
