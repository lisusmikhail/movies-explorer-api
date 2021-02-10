const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  editUserInfo, getCurrentUser,
} = require('../controllers/users');
const {getUserInfoValidator, editUserInfoValidator} = require('../middlewares/validator')


router.get('/me', getCurrentUser);

router.put('/me', editUserInfo);


module.exports = router;
