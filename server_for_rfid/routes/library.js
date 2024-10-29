const express = require('express');
const { isPresent } = require('../services/idToName');
const { studentModel } = require('../models/student');
const { libraryModel } = require('../models/library');

// Variables for library management
let library_id = "";
let library_msg = "";

// Router
const library_route = express.Router();

// Route for viewing library status
library_route.get('/', async (req, res) => {
    let temp_msg = library_msg;
    library_msg = "";
    
    if (library_id !== "") {
        const check = await isPresent(library_id);
        if (check == null) {
            library_id = "";
            res.render('library.ejs', { display: false, msg: "No such student present" });
        } else {
            res.render('library.ejs', { display: true, msg: `Hello ${check}, book checkout processed` });
        }
    } else {
        res.render('library.ejs', { display: false, msg: temp_msg });
    }
});

// Route for initiating book checkout
library_route.post('/', (req, res) => {
    if (library_id === "") {
        library_id = req.body.id;
        console.log("from library post id: ", library_id);
        res.json({
            status: "Successfully read id",
            id: library_id,
        });
    } else {
        res.json({
            status: "another checkout process in progress",
        });
    }
});

// Route for processing book checkout or return
library_route.post('/record', async (req, res) => {
    const { bookName , bookNo } = req.body;  // `action` will be either 'checkout' or 'return'
    console.log("Library ID:", library_id);

    const student = await studentModel.findOne({ rfid: library_id });
    library_id = "";

    try {
        if (student) {
            const today = new Date().toISOString().slice(0, 10);  // Format: 'YYYY-MM-DD'

                // Record a new checkout
            await libraryModel.create({
                student_connection: student._id,
                book_name: bookName,
                book_no: bookNo,
                date: today,
            });
            library_msg = `Book ${bookNo} checkout recorded for ${student.name}`;
            res.redirect(302, '/library');
        } else {
            library_msg = "Student not found";
            res.redirect(302, '/library');
        }
    } catch (err) {
        library_msg = "Error in processing book record";
        console.error("Error in library record processing:", err);
        res.redirect(302, '/library');
    }
});

// Exports
module.exports = {
    library_route,
};
