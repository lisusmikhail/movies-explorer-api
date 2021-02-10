const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors/BadRequestError');
const {JWT_SECRET, errorMessages } = require('../config')

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  // const { NODE_ENV, JWT_SECRET } = process.env;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadRequestError(errorMessages.authError);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};
