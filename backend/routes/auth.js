const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  requestResetPassword,
  resetPassword,
  captcha
} = require('../controllers/auth');

router.post('/signup', signup);
router.post('/login', login);
router.post('/request-reset-password', requestResetPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/captcha', captcha);

module.exports = router;
