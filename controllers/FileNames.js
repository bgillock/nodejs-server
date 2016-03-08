'use strict';

var url = require('url');


var FileNames = require('./FileNamesService');


module.exports.filesGET = function filesGET (req, res, next) {
  FileNames.filesGET(req.swagger.params, res, next);
};
