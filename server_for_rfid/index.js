const express = require("express");
const cors = require('cors');
const portfinder = require('portfinder');
const { makeConnection } = require("./connect");
const path = require('path');
const { base_routes } = require("./routes/base");



// create app
const app = express();

// connect to db
makeConnection("rfid_db").then( () => console.log("connected to db") );


// middlewares
app.use(cors({ origin : '*' }));    
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded( { extended : false } ));
app.use(express.json());





// Routes
app.use( '/' , base_routes );




// start server
portfinder.basePort = 3000; // Starting port
portfinder.getPort((err, port) => {
  if (err) {
    console.error('Error finding a free port:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
});



