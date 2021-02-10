const router = require('express').Router();
const {signUpValidator, signInValidator, userDataValidator, authDataValidator} = require('../middlewares/validator')
const {
  createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRoute = require('./users');

router.post('/signin', authDataValidator, login);
router.post('/signup', authDataValidator, createUser);
router.use(auth);
router.use('/users', userDataValidator, usersRoute);

module.exports = router
