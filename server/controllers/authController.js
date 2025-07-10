const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const emailService = require('../services/emailService');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'That email is already registered.' });
    }
    const user = await User.create({ name, email, password, role });
    const token = crypto.randomBytes(20).toString('hex');
    await emailService.sendVerificationEmail(user, token);
    res.status(201).json({ message: 'Registered! Check email.' });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Email not verified' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, id: user._id, name: user.name, role: user.role });
  } catch (e) { next(e); }
};

exports.verifyEmail = async (req, res) => {
  res.json({ message: 'Email verified' });
};

exports.getMe = (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, role: req.user.role, email: req.user.email });
};
