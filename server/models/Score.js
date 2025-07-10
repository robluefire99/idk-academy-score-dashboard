const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  student:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject:  { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  score:    { type: Number, min: 0, max: 100 },
  feedback: { type: String }
}, { timestamps: true });

module.exports = model('Score', scoreSchema);
