const Subject = require('../models/Subject');

exports.getSubjects = async (req, res) => {
  res.json(await Subject.find({ lecturer: req.user._id }));
};
