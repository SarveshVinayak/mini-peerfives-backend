const express = require("express");
const { validate } = require("../middlewares/validate");
const userValidation = require("../validations/userValidation");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/user",
  validate(userValidation.createUser),
  userController.createUser
);

module.exports = router;
