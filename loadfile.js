var http = require('http');
var fs = require('fs');
var qs = require('querystring');


var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
		processPost(req, res, function() {
            console.log(req.post['filename']);
            // Use request.post here

            res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
            res.end();
        });
    }

});

function displayForm(res) {
	console.log("get");
    fs.readFile('LoadFile.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processPost(request, response, callback) {
    var queryData = "";
    if(typeof callback !== 'function') return null;

    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            request.post = qs.parse(queryData);
            console.log(request.post['filename']);
            callback();
        });

    } else {
        response.writeHead(405, {'Content-Type': 'text/plain'});
        response.end();
    }
}


server.listen(3000);
console.log("server listening on 3000");