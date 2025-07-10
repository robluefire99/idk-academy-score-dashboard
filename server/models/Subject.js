const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
  name:         { type: String, required: true },
  lecturer:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
  semester:     { type: Number, enum: [1,2], required: true },
  academicYear: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Subject', subjectSchema);
