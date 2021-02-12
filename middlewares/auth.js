const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../errors/AuthenticationError');
const { JWT_SECRET } = require('../config');
const errorMessages = require('../utils');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthenticationError(errorMessages.authError);
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
