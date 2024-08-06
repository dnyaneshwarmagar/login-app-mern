// backend/routes/auth.js
const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
], authController.signup);

router.post('/login', authController.login);
router.post('/request-reset-password', authController.requestResetPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/captcha', authController.getCaptcha);

module.exports = router;
