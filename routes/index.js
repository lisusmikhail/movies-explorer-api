const router = require('express').Router();
const { userDataValidator, authDataValidator } = require('../middlewares/validator');
const { errorMessages } = require('../config');
const {
  createUser, login,
} = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const checkPassword = require('../middlewares/check-password');
const usersRoute = require('./users');

router.post('/signin', authDataValidator, checkPassword, login);
router.post('/signup', authDataValidator, checkPassword, createUser);
router.use(auth);
router.use('/users', userDataValidator, usersRoute);

router.use('/', ((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundError));
}));

module.exports = router;
