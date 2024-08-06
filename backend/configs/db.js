const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
      } catch (err) {
        console.error(err.message);
      }
}

module.exports = connectToDB;