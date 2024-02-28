const Joi = require("joi");
const { JOI } = require("../config/constants");

exports.userList = {
  query: Joi.object().keys({
    page: JOI.PAGE,
    limit: JOI.LIMIT,
  }),
};

exports.createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

exports.getUser = {
  params: Joi.object().keys({
    id: JOI.OBJECTID,
  }),
};

exports.rewardsUserList = {
  params: Joi.object().keys({
    id: JOI.OBJECTID,
  }),
};

exports.giveReward = {
  body: Joi.object().keys({
    _id: JOI.OBJECTID,
    points: Joi.number().max(100).required(),
  }),
  params: Joi.object().keys({
    id: JOI.OBJECTID,
  }),
};

exports.rewardHistory = {
  params: Joi.object().keys({
    id: JOI.OBJECTID,
  }),
};

exports.p5History = {
  params: Joi.object().keys({
    id: JOI.OBJECTID,
  }),
};

exports.deleteP5 = {
  params: Joi.object().keys({
    id: JOI.OBJECTID,
  }),
};
