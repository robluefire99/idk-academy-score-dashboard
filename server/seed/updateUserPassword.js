// Usage: node updateUserPassword.js <email> <newPassword>
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/User');
const connectDB = require('../config/db');

connectDB();

const [,, email, newPassword] = process.argv;
if (!email || !newPassword) {
  console.error('Usage: node updateUserPassword.js <email> <newPassword>');
  process.exit(1);
}

(async () => {
  const user = await User.findOne({ email });
  if (!user) {
    console.error('User not found:', email);
    process.exit(1);
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();
  console.log(`Password updated for ${email}`);
  process.exit();
})();
