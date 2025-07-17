const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGODB_URI;
    if (!MONGO_URI) throw new Error('MONGODB_URI not defined');

    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    if (process.env.NODE_ENV === 'test') {
      throw new Error("Failed to connect to MongoDB in test mode");
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
