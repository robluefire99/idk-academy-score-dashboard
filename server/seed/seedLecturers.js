const mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');
const bcrypt   = require('bcryptjs');
require('dotenv').config();
const User     = require('../models/User');
const connectDB= require('../config/db');

connectDB();

(async () => {
  const filePath = path.join(__dirname, 'lecturers.json');
  const lecturers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const l of lecturers) {
    const existing = await User.findOne({ email: l.email });
    if (!existing) {
      const hashed = await bcrypt.hash(l.password, 10);
      await User.create({
        name: l.name,
        email: l.email,
        password: hashed,
        role: 'lecturer',
        gender: l.gender,
        isVerified: true
      });
      console.log(`Created ${l.email}`);
    } else {
      if (!existing.isVerified) {
        existing.isVerified = true;
        await existing.save();
        console.log(`Updated isVerified for ${l.email}`);
      }
    }
  }
  console.log('✅ Lecturer seeding complete');
  process.exit();
})();
