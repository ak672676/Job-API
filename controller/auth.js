const { StatusCodes } = require("http-status-codes");
const NotFound = require("../errors/NotFoundError");
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const User = require("../model/User");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  const isMatched = await user.isValidPassword(password);
  if (!isMatched) throw new UnauthenticatedError("Invalid credentials");
  const token = user.generateToken();
  res.status(StatusCodes.OK).json({ user, token });
};

const register = async (req, res, next) => {
  const user = await User.create(req.body);
  const token = user.generateToken();
  res.status(StatusCodes.CREATED).json({ user, token });
};

module.exports = {
  register,
  login,
};
