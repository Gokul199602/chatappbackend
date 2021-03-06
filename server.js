const express = require('express');
const mysqlCon = require('./config/conection');
const app = express();
const port = 8000;
var cors = require('cors');

mysqlCon.connectToServer( function( err, client ) {
  if (err) console.log(err);
  console.log("Server Connected");
  console.log("Welcome to Forza API services");
} );


app.use(require('./routes/')); 


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


