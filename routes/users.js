const router = require('express').Router();

const {
  editUserInfo, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.put('/me', editUserInfo);

module.exports = router;
