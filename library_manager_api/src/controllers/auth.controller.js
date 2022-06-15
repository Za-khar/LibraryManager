const User = require("../models/User");
const tokenService = require("../services/token.service");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

class AuthController {
  // async logout(req, res) {
  //   try {
  //     await authService.logoutUser(req.body.refreshToken);
  //     res.send();
  //   } catch (e) {
  //     if (e.statusCode) {
  //       return res.status(e.statusCode).send({ message: e.message });
  //     }
  //     res.status(500).send({ message: "Logout error" });
  //   }
  // }

  async simpleLogin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findByLogin(email);
      if (!user) {
        throw new ApiError(402, "Invalid email");
      }
      const isPassValid = await bcrypt.compare(password, user.password);

      if (isPassValid && user.user_id) {
        const authToken = await tokenService.generateToken(user.user_id);

        const { password, ...userData } = user;
        return res.send({
          firstName: user?.first_name ?? "",
          lastName: user?.last_name ?? "",
          ...userData,
          token: authToken,
        });
      } else {
        return res.status(401).send({ message: "Invalid login or password" });
      }
    } catch (e) {
      console.log(e);
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message });
      }

      return res.status(500).send({ message: "Login error!" });
    }
  }

  async simpleRegistaration(req, res) {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, 4);
      const user = (await User.saveUser({ ...req.body, hashPassword }))[0];
      console.log(user);
      const authToken = await tokenService.generateToken(user.user_id);

      const { password, ...userData } = user;

      return res.send({
        firstName: user?.first_name ?? "",
        lastName: user?.last_name ?? "",
        ...userData,
        token: authToken,
        message: "You are registered!",
      });
    } catch (e) {
      console.log(e);
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message });
      }

      res.status(500).send({ message: "Registration error!" });
    }
  }
}

module.exports = new AuthController();
