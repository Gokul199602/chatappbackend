var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var url = require('url');
const mysql = require('mysql');
var http = require('http');
const mysql_db = require('../config/conection');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.get('/users/getUsers',urlencodedParser,(req, res) => {
    const connection = mysql_db.getDb();
    let queryObject = req.body;
    let {gp_name,user_id} = queryObject;
    connection.query(`SELECT * FROM users`, function (err, result, fields){
      var sendResponse = true;
      var responseObj ={
        result
      };
      responseString = "Users Fetched Successfully";
      if(err)
      {
        responseString = "Error";
        sendResponse = true;
        console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
   });
  });


  module.exports = router;