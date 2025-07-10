const Score = require('../models/Score');

exports.createScore = async (req, res) => {
  res.status(201).json(await Score.create(req.body));
};

exports.getScores = async (req, res) => {
  const { studentId, page = 1, limit = 5 } = req.query;
  const filter = { student: req.user.role === 'student' ? req.user._id : studentId };
  const docs = await Score.find(filter)
                          .skip((page - 1) * limit)
                          .limit(Number(limit));
  const total = await Score.countDocuments(filter);
  res.json({
    docs,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
    totalDocs: total
  });
};

exports.updateScore = async (req, res) => {
  res.json(await Score.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.deleteScore = async (req, res) => {
  await Score.findByIdAndDelete(req.params.id);
  res.json({ message: 'Score deleted' });
};
