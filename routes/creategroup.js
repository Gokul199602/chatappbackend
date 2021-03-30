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

router.post('/users/creategroup',jsonParser,(req, res) => {
    const connection = mysql_db.getDb();
    let queryObject = req.body;
    let {gp_name,user_id,admin} = queryObject;
    connection.query(`INSERT INTO groups(gp_name, user_id, admin) VALUES ("${gp_name}","${user_id}","${admin}")`, function (err, result, fields){
      var sendResponse = true;
      var responseObj ={};
      responseString = "Group added sucessfully";
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

  router.get('/users/getGroups',jsonParser,(req, res) => {
    const connection = mysql_db.getDb();
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);
    connection.query(`SELECT * FROM groups WHERE user_id LIKE "%${query.userId}%" OR admin LIKE "${query.userId}"`, function (err, result, fields){
      var sendResponse = true;
      var responseObj ={};
      console.log(result);
      responseString = "Group Fetched Successfully";
      if(err)
      {
        responseString = "Error";
        sendResponse = true;
        console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:result}));
   });
  });

  router.post('/users/deletegroup',jsonParser,(req, res) => {
    const connection = mysql_db.getDb();
    let queryObject = req.body;
    let {gp_id,admin} = queryObject;
    var sendResponse = true;
    var responseObj ={};
    var responseString;
    connection.query(`SELECT * FROM groups WHERE gp_id = "${gp_id}"`, function (err, result, fields){
      console.log(result);
      if(result.length == 0)
      {
        responseString = "Group does not exist";
        sendResponse = false;
      }
      else if(result[0].admin == admin)
      {
        connection.query(`DELETE FROM groups WHERE gp_id = "${gp_id}"`, function (err, result, fields){
          responseString = "Group deleted sucessfully";
          if(err)
          {
            responseString = "Group not deleted";
            sendResponse = false;
            console.log(err);
          }
          console.log("Deleted successsfully");
        });
      }
      else
      {
          responseString = "You are not admin";
          sendResponse = false;
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({response:sendResponse,responseString:responseString,data:responseObj}));
    });
  });

  module.exports = router;