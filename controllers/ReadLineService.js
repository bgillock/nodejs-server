'use strict';

exports.readLineGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * file (String)
  * line (BigDecimal)
  * starXline (BigDecimal)
  * nTraces (String)
  **/
    console.log(args.line.value);
  	var examples = [];
  	var fileName = args.file.value;
	var line = args.line.value;
	var startXline = args.starXline.value;
	var nTraces = args.nTraces.value;
    var fs = require("fs");
	fs.exists(fileName, function(exists) {
	  	if (exists) {
	    	fs.stat(fileName, function(error, stats) {
		      	fs.open(fileName, "r", function(error, fd) {
		      		console.log("Call read");
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
	  					var bufferSize = nTraces * nsamples;
		    			buffer = new Buffer(bufferSize);
		    			var offset = (((line-annotinlinestart)/annotinlineinc) * bufferSize) + 
		    						   (((startXline-annotxlinestart)/annotxlineinc) * nsamples);
		    		    var bufferLength = buffer.length;
		    			fs.read(fd, buffer, 0, buffer.length, headerSize + offset, function(error, bytesRead, buffer) {
		    				if (buffer.length != bufferLength) console.log("buffer diff", buffer.length);
			    			var data = buffer.toString("base64", 0, buffer.length);
			        		fs.close(fd);

			    			examples.push({ "samples": data });
			    			
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
			});
		}	              	
	});
  
}

