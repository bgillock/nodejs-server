'use strict';

var url = require('url');


var Load = require('./LoadService');


module.exports.loadPOST = function loadPOST (req, res, next) {
  Load.loadPOST(req.swagger.params, res, next);
};
