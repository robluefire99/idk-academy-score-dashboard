const Subject = require('../models/Subject');

// Get all subjects (for students to pick from)
exports.getSubjects = async (req, res) => {
  // If lecturer, only their subjects; if student, all subjects
  if (req.user.role === 'lecturer') {
    res.json(await Subject.find({ lecturer: req.user._id }));
  } else {
    res.json(await Subject.find({}));
  }
};
