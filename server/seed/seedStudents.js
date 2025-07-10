const mongoose = require('mongoose');
const fs       = require('fs');
const path     = require('path');
const bcrypt   = require('bcryptjs');
require('dotenv').config();
const User     = require('../models/User');
const connectDB= require('../config/db');

connectDB();

(async () => {
  const filePath = path.join(__dirname, 'students.json');
  const students = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  for (const s of students) {
    const existing = await User.findOne({ email: s.email });
    if (!existing) {
      const hashed = await bcrypt.hash(s.password, 10);
      await User.create({
        name: s.name,
        email: s.email,
        password: hashed,
        role: 'student',
        gender: s.gender,
        isVerified: true
      });
      console.log(`Created ${s.email}`);
    } else {
      // Update isVerified to true for existing students
      if (!existing.isVerified) {
        existing.isVerified = true;
        await existing.save();
        console.log(`Updated isVerified for ${s.email}`);
      }
    }
  }
  console.log('✅ Seeding complete');
  process.exit();
})();
