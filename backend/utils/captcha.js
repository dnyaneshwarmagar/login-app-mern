// backend/utils/captcha.js
const CaptchaGenerator = require('node-captcha-generator');

const generateCaptcha = () => {
  const captcha = new CaptchaGenerator();
  captcha.generate();
  return { text: captcha.text, data: captcha.data };
};

module.exports = generateCaptcha;
