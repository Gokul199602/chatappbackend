var models = require('../models');
const mysql_db = require('../config/conection');
const { response } = require('express');


exports.sendMessage = function(req, res, next) {
	  const connection = mysql_db.getDb();
    let queryObject = req.body;
    let {userId, message, time,touserid,photos} = queryObject;
    var sendResponse = true,
    responseString = "Send Chat successfull",
    responseObj =  {};
    models.sendChat(userId, message, time,touserid,photos,connection, (err, result, fields)=>{
      responseObj = result;
      if(err)
      {
        sendResponse = false;
        responseString = err;
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
    })
}


exports.getAllChats = function(req, res, next)
{
    const connection = mysql_db.getDb();
    let queryObject = req.body;
    console.log(queryObject);
    models.getAllChats(connection, (err, result, fields)=>{
      var sendResponse = true,
      responseString = "Chat data fetched";
      let responseObj = result;
      if(err)
      {
        sendResponse = false;
        responseString = "Something Went Wrong";
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
    })
}

exports.sendMessage = function(req, res, next) {
    const connection = mysql_db.getDb();
  let queryObject = req.body;
  let {userId, message, time,touserid,photos} = queryObject;
  var sendResponse = true,
  responseString = "Send Chat successfull",
  responseObj =  {};
  models.sendChat(userId, message, time,touserid,photos,connection, (err, result, fields)=>{
    responseObj = result;
    if(err)
    {
      sendResponse = false;
      responseString = err;
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
  })
}

exports.getMessages = function(req, res, next)
{
  const connection = mysql_db.getDb();
  let queryObject = req.body;
  console.log(queryObject);
  let {firstName,lastName,email,password} = queryObject;
  models.checkEmail(email,connection, (err, result, fields)=>{
    var sendResponse = true,
    responseString = "Fetched Chat users suceessfully";
    var responseObj = {};
    if(sendResponse == true)
    {
      models.getAllChats(connection, (err, result, fields)=>{
        if(err)
        {
          sendResponse = false;
          responseString = "Sorry, something went wrong";
        }
        responseObj = result;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({response:sendResponse,responseString:responseString,responseObj:responseObj}));
      })
    }
    else
    {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,responseObj:responseObj}));
    }
  })
}



