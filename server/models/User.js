const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin','lecturer','student'], default: 'student' },
  gender:   { type: String, enum: ['M','F'] },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  subject:  [{ type: Schema.Types.ObjectId, ref: 'Subject' }], // Now supports multiple subjects for students
  profileComplete: { type: Boolean, default: false } // For Google OAuth users to complete profile
}, { timestamps: true });

userSchema.methods.matchPassword = function(entered) {
  return bcrypt.compare(entered, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = model('User', userSchema);
