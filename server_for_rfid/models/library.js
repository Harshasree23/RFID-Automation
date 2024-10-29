const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
    student_connection: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    book_name: { type: String, required: true },
    book_no: { type: String, required: true },
    date: { type: String, required: true },
});

const libraryModel = mongoose.model('Library', librarySchema);

module.exports = { libraryModel };
