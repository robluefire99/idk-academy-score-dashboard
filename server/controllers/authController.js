const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const emailService = require('../services/emailService');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, subject, gender } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'That email is already registered.' });
    }
    // Only save subject if role is lecturer
    const userData = { name, email, password, role, gender, isVerified: true };
    if (role === 'lecturer' && subject) userData.subject = subject;
    const user = await User.create(userData);
    res.status(201).json({ message: 'Registered! You can now log in.' });
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
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired verification link.' });
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    res.json({ message: 'Email verified successfully!' });
  } catch (e) {
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getMe = (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, role: req.user.role, email: req.user.email });
};
