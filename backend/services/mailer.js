const nodemailer = require('nodemailer');

const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    await transporter.sendMail({
      from: `"Login App" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetUrl}`,
      html: `<p>Click the following link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`
    });

  } catch (error) {
    // console.log('error: ', error);
    throw new Error(error)
  }
};

module.exports = { sendResetPasswordEmail };
