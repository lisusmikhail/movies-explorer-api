const { BadRequestError } = require('../errors/BadRequestError');
const { errorMessages } = require('../utils');

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.trim() || password.trim().length < 8) {
    throw new BadRequestError(errorMessages.passwordError);
  } else {
    next();
  }
};

module.exports = checkPassword;
