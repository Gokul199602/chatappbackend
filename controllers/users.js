var models = require('../models');
const mysql_db = require('../config/conection');


exports.login = function(req, res, next) {
	  const connection = mysql_db.getDb();
    let queryObject = req.body;
    let {email,password} = queryObject;
    console.log(queryObject);
    var sendResponse = true,
    responseString = "Login Successful",
    responseObj =  {};
    console.log("Email",email);
    console.log("Password",password);
    models.callLogin(email, password,connection, (err, result, fields)=>{
       responseObj = result;
      if(result.length)
      {
          sendResponse =  true;
          responseString = "You are logged in.";
      }
      else
      {
          sendResponse = false;
          responseString = "Please check your credentials";
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
    })
}

exports.register = function(req, res, next)
{
    const connection = mysql_db.getDb();
    let queryObject = req.body;
    console.log(queryObject);
    let {firstName,lastName,email,password} = queryObject;
    models.checkEmail(email,connection, (err, result, fields)=>{
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
        models.registerForm(firstName,lastName,email,password,connection, (err, result, fields)=>{
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
    })
}

exports.getallusers = function(req, res, next)
{
    const connection = mysql_db.getDb();
    models.getusers(connection, (err, result, fields)=>{
      var sendResponse = true,
      responseString = "Users successfully fetched",
      responseObj = result;
      if(err)
      {
        sendResponse = false;
        responseString = "Error";
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
    })
}

