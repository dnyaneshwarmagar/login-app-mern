// backend/models/User.js
const {Schema,model} = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  resetToken: String,
  resetTokenExpiry: Date,
});

module.exports = model('User', userSchema);
