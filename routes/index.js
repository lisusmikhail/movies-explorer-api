const router = require('express').Router();
const { authDataValidator } = require('../middlewares/validator');
const { authLimiter } = require('../middlewares/limiter');
const { errorMessages } = require('../utils');
const {
  createUser, login,
} = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const checkPassword = require('../middlewares/check-password');
const usersRoute = require('./users');
const moviesRoute = require('./movies');

router.post('/signin', authDataValidator, checkPassword, login);
router.post('/signup', authDataValidator, checkPassword, authLimiter, createUser);
router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);

router.use('/', ((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundError));
}));

module.exports = router;
