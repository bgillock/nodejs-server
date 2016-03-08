'use strict';

exports.headerGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * file (String)
  **/
  
  
  var examples = [];
  
    var fs = require("fs");
    console.log(args.file.value);
	fs.exists(args.file.value, function(exists) {
	  	if (exists) {
	    	fs.stat(args.file.value, function(error, stats) {
		      	fs.open(args.file.value, "r", function(error, fd) {
		      		console.log("Call read header");
					var headerSize = 113;
					var buffer = new Buffer(headerSize);
	
					fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
		          		var	name = buffer.toString("utf-8",	0, 25);
		          		var	nlines = buffer.readInt16LE(25);			          
						var	nxlines = buffer.readInt16LE(27);
						var	nsamples = buffer.readInt16LE(29);
						var	originx = buffer.readDoubleLE(31);
						var	originy = buffer.readDoubleLE(39);
						var	inlineendx = buffer.readDoubleLE(47);
						var	inlineendy = buffer.readDoubleLE(55);
						var	xlineendx = buffer.readDoubleLE(63);
						var	xlineendy = buffer.readDoubleLE(71);
						var	samplerate = buffer.readDoubleLE(79);
						var	annotinlinestart = buffer.readInt16LE(87);
						var	annotinlineinc = buffer.readInt16LE(89);
						var	annotxlinestart = buffer.readInt16LE(91);
						var	annotxlineinc = buffer.readInt16LE(93);
						var	minamp = buffer.readDoubleLE(95);
	  					var	maxamp = buffer.readDoubleLE(103);
	  					var	bitspersample = buffer.readInt16LE(111);
						fs.close(fd);

						examples.push({ "name": name.trim(), 
		            				 "nlines": nlines,
		            				 "nxlines": nxlines,
		            				 "nsamples": nsamples,
		            				 "originx": originx ,
		            				 "originy": originy ,
		            				 "inlineendx": inlineendx ,
		            				 "inlineendy": inlineendy ,
		            				 "xlineendx": xlineendx ,
		            				 "xlineendy": xlineendy ,
		            				 "samplerate": samplerate ,
		            				 "annotinlinestart": annotinlinestart,
		            				 "annotinlineinc": annotinlineinc,
		            				 "annotxlinestart": annotxlinestart,
		            				 "annotxlineinc": annotxlineinc,
		            				 "minamp": minamp,
		            				 "maxamp": maxamp,
		            				 "bitspersample": bitspersample });	
		            	console.log("Examples");
    
					    if(Object.keys(examples).length > 0) {
					    	res.setHeader('Content-Type', 'application/json');
					    	res.end(JSON.stringify(examples[0], null, 2));
					  	}
					  	else {
					    	res.end();
					  	}			 
					});	        	
	      		});
	    	});
		}
	});
}

