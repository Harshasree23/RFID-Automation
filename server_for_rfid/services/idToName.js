const { studentModel } = require("../models/student");



const getStudentName = async(rfid) => {
    try{
        let details = await studentModel.findOne({ rfid: new RegExp(`^${rfid}$`) });
        console.log(details);
        return details;
    }
    catch(err)
    {
        console.log(err);
    }
}

const isPresent = async(rfid) => 
{
    try{
        let details = await getStudentName(rfid);
        
        if( details != null )
        {
            console.log( " in IsPresent ",details,"   ",details.name);
            return details.name;
        } 
        return null;
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {
    isPresent,
}