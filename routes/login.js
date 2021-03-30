var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var url = require('url');
var cors = require('cors');
const mysql = require('mysql');
var http = require('http');
const mysql_db = require('../config/conection');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.options('*', cors());

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.post('/users/register',jsonParser,(req, res) => {
    const connection = mysql_db.getDb();
    let queryObject = req.body;
    let {firstName,lastName,email,password} = queryObject;
    connection.query(`SELECT email FROM users WHERE email ="${email}"`, function (err, result, fields){
      var sendResponse = true,
      responseString = "Registered Successfully";
      result.forEach((sqlData)=>{
        let {email} = sqlData;
        if(email == queryObject.email)
        {
          sendResponse = false;
          responseString = "The User already registered"
        }
      })
      if(sendResponse == true)
      {
        connection.query(`INSERT INTO users (FirstName,LastName,email,password) VALUES ("${firstName}","${lastName}","${email}","${password}")`, function (err, result, fields){
          if(err)
          {
            sendResponse = false;
            responseString = "Sorry, something went wrong";
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({response:sendResponse,responseString:responseString}));
        })
      }
      else
      {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response:sendResponse,responseString:responseString}));
      }
   });
  });
  
  router.post('/users/login',jsonParser, (req, res) => {
    const connection = mysql_db.getDb();
    let queryObject = req.body;
    let {email,password} = queryObject;
    var sendResponse = true,
    responseString = "Login Successful",
    responseObj =  {};
    console.log("Email",email);
    console.log("Password",password);
    connection.query(`SELECT * FROM users WHERE email ="${email}" AND password = "${password}"`, function (err, result, fields){
      responseObj = result;
      if(result.length)
      {
        sendResponse =  true;
        responseString = "You are logged in.";
      }
      else
      {
        sendResponse = false;
        responseString = "No users Found";
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
   });
  });

  module.exports = router;