const jwt = require("jsonwebtoken");
const User = require("../model/User");
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const authenticated = (req, res, next) => {
  const autherizationHeader = req.headers.authorization;
  if (!autherizationHeader || !autherizationHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthenticated");
  }
  const token = autherizationHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: payload._id, name: payload.name };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Unauthenticated");
  }
};

module.exports = authenticated;
