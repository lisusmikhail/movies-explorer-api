const router = require('express').Router();
const { userDataValidator, authDataValidator } = require('../middlewares/validator');
const {
  createUser, login,
} = require('../controllers/users');
const { NotFoundError } = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const usersRoute = require('./users');

router.post('/signin', authDataValidator, login);
router.post('/signup', authDataValidator, createUser);
router.use(auth);
router.use('/users', userDataValidator, usersRoute);

router.use('/', ((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
}));

module.exports = router;
