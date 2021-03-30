var express = require('express');
const mysql = require('mysql');
var http = require('http');
const app = express();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chatapp'
});


var _db;

module.exports = {
  connectToServer: function( callback ) {
    connection.connect(function(err) {
        if (err) throw err;
        _db = connection;
        callback(true);
      });
  },
  getDb: function() {
    return _db;
  }
};