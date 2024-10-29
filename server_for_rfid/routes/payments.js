const express = require('express');
const { isPresent } = require('../services/idToName');
const { studentModel } = require('../models/student');
const { accountModel } = require('../models/amount');

// variables for id
let addAmount_id = "";

// variables for reading

// variables for msg
let addAmount_msg = "";


// router

const addAmount_route = express.Router();

// routes for add card

addAmount_route.get( '/' , 
    async(req,res) => {
        let temp_msg = addAmount_msg;
        addAmount_msg = "";
        if(addAmount_id != "")
        {
            const check = await isPresent( addAmount_id );
            if( check == null )
            {
                addAmount_id = "";
                res.render('addAmount.ejs',{ display:false , msg:" No such student present "});
            }
            else
            {
                res.render('addAmount.ejs',{ display:true , msg: "Hello "+check});
            }
        }
        else
            res.render('addAmount.ejs',{ display: false, msg : temp_msg});
        
            
    }
);

addAmount_route.post( '/' ,
    (req,res) => {
        if( addAmount_id == "")
        {
            addAmount_id = req.body.id;
            console.log("from addAmount post id: ",addAmount_id);
            res.json({
                "status":"Successfully read id",
                "id":addAmount_id,
            });
        }
        else{
            res.json({
                "status":"another card in progress",
            });
        }
    }
);

addAmount_route.post('/processing',
    async (req,res) => {
        const { amount } = req.body;
        console.log(addAmount_id);
        console.log( "inside addAmounts - prosessing - post request , amount ", amount );
        const name = await studentModel.findOne({ rfid : addAmount_id });
        const acc = await accountModel.findOne({ student_connection : name._id });
        if( !acc )
        {
            try{
                const amount_model = await accountModel.create({
                    amount :Number(amount),
                    student_connection : name._id,
                });
                console.log(amount_model);
                addAmount_msg = "Amount " + amount +" added to "+ name.name + " account";
                addAmount_id = "";
                res.redirect(302,'/addAmount');
            }
            catch(err)
            {
                console.log(err);
                addAmount_msg = "error in adding amount please try again" ;
                addAmount_id = "";
                res.redirect(302,'/addAmount');
            }
        }
        else
        {
            acc.amount += Number(amount);
            console.log(amount);
            await acc.save();
            addAmount_msg = "Amount " + amount +" added to "+ name.name + " account";
            addAmount_id = "";
            res.redirect(302,'/addAmount');
        }

    }
);


// exports
module.exports = {
    addAmount_route,
}