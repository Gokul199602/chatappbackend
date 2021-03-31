var express = require('express');
const mysql = require('mysql');
var http = require('http');
const app = express();
const connection = mysql.createConnection({
  host: 'database-1.c4duxnxp6vd4.us-east-2.rds.amazonaws.com',
  user: 'root',
  password: 'Flatron12!',
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