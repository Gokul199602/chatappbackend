'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
var db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    for (const property in model) {
        db[property] = model[property];
      }
  });

module.exports = db;
