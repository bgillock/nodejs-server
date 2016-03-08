'use strict';

var url = require('url');


var ReadLine = require('./ReadLineService');


module.exports.readLineGET = function readLineGET (req, res, next) {
  ReadLine.readLineGET(req.swagger.params, res, next);
};
