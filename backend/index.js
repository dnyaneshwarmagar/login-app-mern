const express = require('express');
const session = require('express-session');
const cors = require("cors");
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
