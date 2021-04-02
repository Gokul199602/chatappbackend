var express = require('express');
var router = express();
const bodyParser = require("body-parser");
var url = require('url');
var cors = require('cors');
const mysql = require('mysql');
var http = require('http');
let user = require('../controllers/users');
let chat = require('../controllers/messages');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.options('*', cors());

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/users/register',urlencodedParser,user.register);
router.post('/users/login',urlencodedParser,user.login);
router.post('/chat/send',jsonParser,chat.sendMessage);
router.get('/chat/send',urlencodedParser,chat.getMessages);
router.get('/users/getusers',urlencodedParser,user.getallusers);
router.get('/users/getChats',urlencodedParser,chat.getAllChats);


module.exports = router;