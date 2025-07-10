const mongoose = require('mongoose');
require('dotenv').config();
const Subject = require('../models/Subject');
const User = require('../models/User');
const connectDB = require('../config/db');

connectDB();

const subjects = [
  { name: 'JavaScript', lecturerEmail: 'kimjongun@idk-lecturer.com', semester: 1, academicYear: '2024/2025' },
  { name: 'Cybersecurity', lecturerEmail: 'yimsiwan@idk-lecturer.com', semester: 1, academicYear: '2024/2025' },
  { name: 'AI Ethics & Security', lecturerEmail: 'leejungjae@idk-lecturer.com', semester: 2, academicYear: '2024/2025' }
];

(async () => {
  for (const subj of subjects) {
    const lecturer = await User.findOne({ email: subj.lecturerEmail });
    if (!lecturer) {
      console.error(`Lecturer not found: ${subj.lecturerEmail}`);
      continue;
    }
    const exists = await Subject.findOne({ name: subj.name, lecturer: lecturer._id });
    if (!exists) {
      await Subject.create({
        name: subj.name,
        lecturer: lecturer._id,
        semester: subj.semester,
        academicYear: subj.academicYear
      });
      console.log(`Created subject: ${subj.name}`);
    } else {
      console.log(`Subject already exists: ${subj.name}`);
    }
  }
  console.log('✅ Subject seeding complete');
  process.exit();
})();
