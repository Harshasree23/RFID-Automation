const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    rollno:{
        type:String,
        required:true,
        unique:true,
    },
    rfid:{
        type:String,
        required:true,
        unique:true,
    },
});

//Export the model
const studentModel =  mongoose.model('student', StudentSchema);

module.exports = {
    studentModel,
}