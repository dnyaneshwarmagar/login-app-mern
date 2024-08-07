const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require("bcryptjs")
const { sendResetPasswordEmail } = require('../services/mailer');
const { createCaptcha } = require('../services/captcha');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!isValidPassword) {
      return res.status(400).json({ error: `Password must be at least 7 characters long
        It must contain at least one capital letter,
         at least one small letter,
        at least one special character,
        contain at least one number.` });
    }

    const user = new User({ name, email, username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Email or username already exists' });
  }
};

exports.login = async (req, res) => {
  const { username, password, captcha, captchaToken } = req.body;

  if (!username || !password || !captcha || !captchaToken) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const storedCaptcha = Buffer.from(captchaToken, 'base64').toString('ascii');
    if (captcha !== storedCaptcha) {
      return res.status(400).json({ error: 'Invalid CAPTCHA' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (err) {
    // console.log('err: ', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.requestResetPassword = async (req, res) => {
  const { email } = req.body;
  // console.log('email: ', email);
  // console.log("hit reset password");
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/reset-password/${token}`;
    // console.log('resetUrl: ', resetUrl);
    await sendResetPasswordEmail(user.email, resetUrl);

    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (err) {
    // console.log("hit error reset reset password");
    res.status(500).json({ error: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired' });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      return res.status(400).json({ error: 'New password cannot be the same as the previous password' });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    // console.log('password: ', "Password reset successfully");
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    // console.log('err: ', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.captcha = (req, res) => {
  const { text, captchaToken } = createCaptcha();
  // console.log('text: ', text);
  res.status(200).json({ captcha: text, captchaToken });
};
