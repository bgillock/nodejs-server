'use strict';

exports.filesGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  
  
  var examples = {};
  /*
  examples['application/json'] = [ {
  "name" : "aeiou"
} ];
  */
  var filesystem = require("fs");
    filesystem.readdirSync("/volume1/homes/admin/www/nodejs").forEach(function(file) {
    	 	if (file.indexOf(".jsz") > -1) examples.push({"name": file}); 
    	 	console.log(file);
        });
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples, null, 2));
  }
  else {
    res.end();
  }
  
  
}

