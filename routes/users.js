const router = require('express').Router();
const { userDataValidator } = require('../middlewares/validator');

const {
  editUserInfo, getCurrentUser,
} = require('../controllers/users');

router.get('/me', userDataValidator, getCurrentUser);
router.put('/me', userDataValidator, editUserInfo);

module.exports = router;
