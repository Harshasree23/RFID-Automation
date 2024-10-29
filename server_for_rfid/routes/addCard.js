const express = require('express');
const { isPresent } = require('../services/idToName');
const { studentModel } = require('../models/student');

// variables for id
let addCard_id = "";

// variables for reading

// variables for msg
let addCard_msg = "";


// router

const addCard_route = express.Router();

// routes for add card

addCard_route.get( '/' , 
    async(req,res) => {
        let temp_msg = addCard_msg;
        addCard_msg = "";
        if(addCard_id != "")
        {
            const check = await isPresent( addCard_id );
            if( check == null )
                res.render('addCard.ejs',{ display:true , msg: temp_msg});
            else
            {
                addCard_id = "";
                res.render('addCard.ejs',{ display:false , msg: "Student "+check+" already present "});
            }
        }
        else
            res.render('addCard.ejs',{ display: false, msg : temp_msg});
        
            
    }
);

addCard_route.post( '/' ,
    (req,res) => {
        if( addCard_id == "")
        {
            addCard_id = req.body.id;
            console.log("from addcard post added id : ",addCard_id);
            res.json({
                "status":"Successfully read id",
                "id":addCard_id,
            });
        }
        else{
            res.json({
                "status":"another card in progress",
            });
        }
    }
);

addCard_route.post('/processing',
    async (req,res) => {
        const { name , rollno } = req.body;
        console.log(addCard_id);
        console.log( "inside addcards - prosessing - post request , recieved name and roll no",name,rollno );
        try{
            const stu_model = await studentModel.create({
                name,
                rollno,
                rfid:addCard_id,
            });
            console.log(stu_model);
            addCard_msg = "New card added with name " + name ;
            addCard_id = "";
            res.redirect(302,'/addCard');
        }
        catch(err)
        {
            console.log(err);
            addCard_msg = "error in adding student please try again" ;
            addCard_id = "";
            res.redirect(302,'/addCard');
        }

    }
);


// exports
module.exports = {
    addCard_route,
}