'use strict';

var url = require('url');


var Header = require('./HeaderService');


module.exports.headerGET = function headerGET (req, res, next) {
  Header.headerGET(req.swagger.params, res, next);
};
