const express = require('express');
const cors = require("cors");
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));



app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
