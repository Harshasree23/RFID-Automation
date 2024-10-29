const express = require('express');
const { isPresent } = require('../services/idToName');
const { studentModel } = require('../models/student');
const { attendanceModel } = require('../models/attendance');

// Variables for attendance
let attendance_id = "";
let attendance_msg = "";

// Router
const attendance_route = express.Router();

// Route for viewing attendance status
attendance_route.get('/', async (req, res) => {
    let temp_msg = attendance_msg;
    attendance_msg = "";
    
    if (attendance_id !== "") {
        const check = await isPresent(attendance_id);
        if (check == null) {
            attendance_id = "";
            res.render('attendance.ejs', { display: false, msg: "No such student present" });
        } else {
            attendance_id = "";
            res.render('attendance.ejs', { display: true, msg: `Hello ${check}, attendance marked` });
        }
    } else {
        res.render('attendance.ejs', { display: false, msg: temp_msg });
    }
});

// Route for recording attendance
attendance_route.post('/', (req, res) => {
    if (attendance_id === "") {
        attendance_id = req.body.id;
        console.log("from attendance post id: ", attendance_id);
        res.json({
            status: "Successfully read id",
            id: attendance_id,
        });
    } else {
        res.json({
            status: "another attendance process in progress",
        });
    }
});

// Route for processing attendance record
attendance_route.post('/record', async (req, res) => {
    console.log("Attendance ID:", attendance_id);

    const student = await studentModel.findOne({ rfid: attendance_id });
    attendance_id = "";

    try {
        if (student) {
            const today = new Date().toISOString().slice(0, 10);  // Format: 'YYYY-MM-DD'

            // Check if today's attendance already exists
            const existingAttendance = await attendanceModel.findOne({
                student_connection: student._id,
                date: today
            });

            if (existingAttendance) 
            {
                attendance_msg = `Attendance for ${student.name} has already been recorded today.`;
            } else {
                // Create attendance record for today
                await attendanceModel.create({
                    student_connection: student._id,
                    date: today,
                    present: true
                });
                attendance_msg = `Attendance recorded for ${student.name}`;
            }

            res.redirect(302, '/attendance');
        } else {
            attendance_msg = "Student not found";
            res.redirect(302, '/attendance');
        }
    } catch (err) {
        attendance_msg = "Error in recording attendance";
        console.error("Error in attendance record:", err);
        res.redirect(302, '/attendance');
    }
});


// Exports
module.exports = {
    attendance_route,
};
