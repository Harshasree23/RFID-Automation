const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var accountSchema = new mongoose.Schema({
    amount:{
        type:Number,
        default: 0,
    },
    student_connection:{
        type: mongoose.Schema.Types.ObjectId,  // Reference by ObjectId
        ref: 'StudentSchema',                        // Refers to Student model
        required:true,
    },
});

//Export the model

const accountModel = mongoose.model('account', accountSchema);

module.exports = {
    accountModel,
}