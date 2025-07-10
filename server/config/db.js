const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/idk_academy';
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`🌱 MongoDB connected at ${uri}`);
  } catch (err) {
    console.error('🌵 MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
