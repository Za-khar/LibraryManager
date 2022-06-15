const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const generateToken = (user_id, secret = config.get("SECRET_KEY")) => {
  const payload = {
    sub: user_id,
    iat: moment().unix(),
    exp: moment().add(1, "M").unix(),
  };
  return jwt.sign(payload, secret);
};

module.exports = {
  generateToken,
};
