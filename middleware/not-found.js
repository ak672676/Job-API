const notFoundMiddleware = function (req, res, next) {
  return res.status(404).send("No such endpoint");
};

module.exports = notFoundMiddleware;