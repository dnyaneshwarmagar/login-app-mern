// backend/app.js
const express = require('express');
const session = require('express-session');
const connectDB = require('./configs/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
