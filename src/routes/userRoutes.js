const express = require("express");
const { validate } = require("../middlewares/validate");
const userValidation = require("../validations/userValidation");
const userController = require("../controllers/userController");

const router = express.Router();

//users list
router.get("/list", validate(userValidation.userList), userController.userList);

//create new user
router.post(
  "/user",
  validate(userValidation.createUser),
  userController.createUser
);

//create new user
router.put("/user", validate(userValidation.editUser), userController.editUser);

//get single user details
router.get("/:id", validate(userValidation.getUser), userController.getUser);

// give P5 points to user
router.get(
  "/:id/userList",
  validate(userValidation.rewardsUserList),
  userController.rewardsUserList
);

// give P5 points to user
router
  .route("/:id/reward")
  .post(validate(userValidation.giveReward), userController.giveReward)
  .get(validate(userValidation.rewardHistory), userController.rewardHistory);

//p5 history and delete p5 transaction
router
  .route("/:id/p5")
  .get(validate(userValidation.p5History), userController.p5History)
  .delete(validate(userValidation.deleteP5), userController.deleteP5);

module.exports = router;
