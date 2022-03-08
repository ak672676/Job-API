const CustomError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");
class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message || "Unauthenticated");
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
