'use strict';

var url = require('url');


var Files = require('./FilesService');


module.exports.filesGET = function filesGET (req, res, next) {
  Files.filesGET(req.swagger.params, res, next);
};
