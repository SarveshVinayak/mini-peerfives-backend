const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().required(),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    API_BASE_URL: Joi.string().required().description("Api base url"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error}`);
}

module.exports = {
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  baseurl: envVars.API_BASE_URL,
  projectName: envVars.PROJECT_NAME,
};
