const authRouter = require("express").Router();

const validator = require("../middleware/validator");

const authController = require("../controllers/auth.controller");

authRouter.post(
  "/registration",
  validator({
    email: ["required", "email", "unique:users:email"],
    password: ["required", "min:4", "max:20"],
    firstName: ["required", "min:1", "max:255"],
    lastName: ["required", "min:1", "max:255"],
  }),
  authController.simpleRegistaration
);

authRouter.post(
  "/login",
  validator({
    email: ["required"],
    password: ["required"],
  }),
  authController.simpleLogin
);

// router.post("/logout", authController.logout);

module.exports = authRouter;
