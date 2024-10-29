const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student_connection: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    date: { type: String, required: true },  // e.g., 'YYYY-MM-DD'
    present: { type: Boolean, default: false },
});

attendanceSchema.index({ student_connection: 1, date: 1 }, { unique: true });

const attendanceModel = mongoose.model('Attendance', attendanceSchema);

module.exports = { attendanceModel };
