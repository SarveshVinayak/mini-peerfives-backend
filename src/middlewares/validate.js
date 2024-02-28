const Joi = require("joi");
const { pick } = require("../utils/functions");
const { ValidationError } = require("../utils/errors");

exports.validate = (schema) => (req, res, next) => {
  try {
    const validSchema = pick(schema, ["params", "query", "body"]);

    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: "key" } })
      .validate(object);

    if (error) {
      // console.error(error);
      let errorMessage = error.details
        .map((details) => details.message)
        .join(", ")
        .replace(/"/g, "");
      console.log(errorMessage, object);
      return next(new ValidationError(errorMessage));
    }

    Object.assign(req, value);
    return next();
  } catch (err) {
    return res.send(err);
  }
};
