const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.get("SECRET_KEY"));
      req.user = { user_id: decoded.sub };
    }
  } catch (e) {
    console.log(e);
  }
  return next();
};

module.exports = {
  authMiddleware,
};
