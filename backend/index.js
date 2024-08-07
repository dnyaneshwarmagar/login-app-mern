const express = require('express');
const cors = require("cors");
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors({origin: 'https://login-app-mern-lacq.vercel.app'}));



app.use('/auth', authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
