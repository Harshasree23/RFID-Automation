const express = require('express');
const { studentModel } = require('../models/student');

const details_route = express.Router();

details_route.get("/",
    async (req,res) => {
        const students = await studentModel.find({});
        console.log("Inside student details GET");
        res.render("studentDetails.ejs",{ students : students });
    }
);

module.exports = {
    details_route,
}