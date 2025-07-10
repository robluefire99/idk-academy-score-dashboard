const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: req.query.role });
  res.json(users.map(u => ({ _id: u._id, name: u.name, email: u.email })));
};

exports.updateRole = async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  res.json({ message: 'Role updated', user: u });
};

// Student: Pick or update subject
exports.pickSubject = async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ message: 'Only students can pick a subject.' });
  const { subjectId } = req.body;
  if (!subjectId) return res.status(400).json({ message: 'Subject ID is required.' });
  req.user.subject = subjectId;
  await req.user.save();
  res.json({ message: 'Subject updated', subject: subjectId });
};

// Lecturer: Get students who picked this lecturer's subject(s)
exports.getMyStudents = async (req, res) => {
  if (req.user.role !== 'lecturer') return res.status(403).json({ message: 'Only lecturers can view their students.' });
  const Subject = require('../models/Subject');
  // Find subjects taught by this lecturer
  const subjects = await Subject.find({ lecturer: req.user._id });
  const subjectIds = subjects.map(s => s._id);
  // Find students who picked any of these subjects
  const students = await User.find({ role: 'student', subject: { $in: subjectIds } }).populate('subject');
  res.json(students);
};
