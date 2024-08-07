const crypto = require('crypto');

const createCaptcha = () => {
  const text = crypto.randomBytes(3).toString('hex');
  const captchaToken = Buffer.from(text).toString('base64');
  return { text, captchaToken };
};

module.exports = { createCaptcha };
