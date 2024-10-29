const express = require('express');
const { isPresent } = require('../services/idToName');
const { studentModel } = require('../models/student');
const { accountModel } = require('../models/amount');

// variables for id
let payments_id = "";

// variables for reading

// variables for msg
let payments_msg = "";


// router

const payments_route = express.Router();

// routes for add card

payments_route.get( '/' , 
    async(req,res) => {
        let temp_msg = payments_msg;
        payments_msg = "";
        if(payments_id != "")
        {
            const check = await isPresent( payments_id );
            if( check == null )
            {
                payments_id = "";
                res.render('payments.ejs',{ display:false , msg:" No such student present "});
            }
            else
            {
                res.render('payments.ejs',{ display:true , msg: "Hello "+check});
            }
        }
        else
            res.render('payments.ejs',{ display: false, msg : temp_msg});
        
            
    }
);

payments_route.post( '/' ,
    (req,res) => {
        if( payments_id == "")
        {
            payments_id = req.body.id;
            console.log("from payments post id: ",payments_id);
            res.json({
                "status":"Successfully read id",
                "id":payments_id,
            });
        }
        else{
            res.json({
                "status":"another card in progress",
            });
        }
    }
);

payments_route.post('/processing',
    async (req,res) => {
        const { amount } = req.body;

        console.log("Payment id ",payments_id);
        console.log( "inside payments - prosessing - post request , amount ", amount );
        
        const name = await studentModel.findOne({ rfid : payments_id });
        console.log(name);

        payments_id = "";

        try
        {
            const acc = await accountModel.findOne({ student_connection : name._id });

            if( acc.amount >= Number(amount) )
            {
                acc.amount -= Number(amount);
                console.log(amount);
                await acc.save();
                payments_msg = "Amount " + amount +" debited from "+ name.name + " account";
                res.redirect(302,'/payments');
            }
            else
            {
                payments_msg = " Insufficient balance ";
                res.redirect(302,'/payments');
            }
            
        }
        catch(err)
        {   
            payments_msg = " please add amount to your account ";
            console.log("Please create an account : ",err);
            res.redirect(302,'/payments');
        }
       
        

    }
);


// exports
module.exports = {
    payments_route,
}