const express = require('express');
const { addCard_route } = require('./addCard');
const { details_route } = require('./studentDetails');
const { addAmount_route } = require('./payments');
const { payments_route } = require('./makePayments');
const { attendance_route } = require('./attendance');
const { library_route } = require('./library');

const base_routes = express.Router();


base_routes.use('/addCard', addCard_route );

base_routes.use('/details', details_route);

base_routes.use('/payments', payments_route );

base_routes.use('/addAmount', addAmount_route);

base_routes.use('/attendance', attendance_route);

base_routes.use('/library', library_route );

base_routes.use( '/' , 
    (req,res) => {
        res.render('dashboard.ejs');
    }
);

module.exports = {
    base_routes,
}