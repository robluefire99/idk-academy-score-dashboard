const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.find({ role: req.query.role });
  res.json(users.map(u => ({ _id: u._id, name: u.name, email: u.email })));
};

exports.updateRole = async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  res.json({ message: 'Role updated', user: u });
};
