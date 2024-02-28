const { v4: uuidv4 } = require("uuid");
const { NotFoundError } = require("../utils/errors");
const { errorResponse } = require("../utils/response");
const { ERROR_MESSAGES, STATUS_CODES } = require("../config/constants");

const errorHandler = (error, req, res, next) => {
  return errorResponse(error, req, res);
};

const routeNotFoundHandler = (req, res, next) => {
  return errorResponse(
    new NotFoundError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND),
    req,
    res
  );
};

const requestHandler = (req, res, next) => {
  //@ts-ignore
  req["reqId"] = uuidv4();
  //  Setting Language incase a header come
  res.setLocale(req.get("languageCode") || "en");
  next();
};

module.exports = {
  errorHandler,
  routeNotFoundHandler,
  requestHandler,
};
