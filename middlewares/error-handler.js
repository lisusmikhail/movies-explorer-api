const errorMessages = require('../utils');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorMessages.serverError
        : message,
    });
  next();
};

module.exports = errorHandler;
