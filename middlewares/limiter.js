const rateLimit = require('express-rate-limit');
const { TooManyRequests } = require('../errors/TooManyRequests');
const { errorMessages } = require('../utils');

const limitReached = () => {
  throw new TooManyRequests(errorMessages.tooManyRequests);
};

const limiter = rateLimit({
  windowMs: 60000,
  max: 20,
  onLimitReached: limitReached,
  handler: limitReached,
});

const authLimiter = rateLimit({
  windowMs: 60 * 60000,
  max: 5,
  onLimitReached: limitReached,
  handler: limitReached,
});

module.exports = { limiter, authLimiter };
