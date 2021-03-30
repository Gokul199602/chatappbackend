var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
var url = require('url');
var cors = require('cors');
const mysql = require('mysql');
var http = require('http');
let user = require('../controllers/users');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.options('*', cors());

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

router.post('/users/register',urlencodedParser,user.register);
router.post('/users/login',urlencodedParser,user.login);

  module.exports = router;