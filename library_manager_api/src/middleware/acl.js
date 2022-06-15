function checkAuthorized(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.status(401).send({ message: "Access denied" });
  }
}

module.exports = {
  checkAuthorized,
};
