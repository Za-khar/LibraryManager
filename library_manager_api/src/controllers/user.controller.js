const userModel = require("../models/User");

class UserController {
  async getUser(req, res) {
    try {
      const user_id = req.user.user_id;
      const user = await userModel.getUserById(user_id);
      res.send({
        firstName: user?.first_name ?? "",
        lastName: user?.last_name ?? "",
        id: user?.id ?? "",
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Get user error!" });
    }
  }
}

module.exports = new UserController();
