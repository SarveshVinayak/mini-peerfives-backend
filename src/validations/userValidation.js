const Joi = require("joi");

exports.createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};
