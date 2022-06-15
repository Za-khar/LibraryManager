const userRouter = require("express").Router();

const validator = require("../middleware/validator");

const userController = require("../controllers/user.controller");

userRouter.get("/", userController.getUser);

module.exports = userRouter;
