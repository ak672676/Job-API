const CustomError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");
class NotFound extends CustomError {
  constructor(message) {
    super(message || "Not found");
    this.statusCode = StatusCodes.NotFound;
  }
}

module.exports = NotFound;
