// Dependencies
var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'chatlogin.html'));

});
app.get('/chat', function(request, response) {
    response.sendFile(path.join(__dirname, 'chatroom.html'));
});

// Starts the server.
server.listen(5000, function() {
    console.log('Starting server on port 5000');
});

let dateObject = new Date();
//console.log("A date object is defined")

let date = ("0" + dateObject.getDate()).slice(-2);
let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
let year = dateObject.getFullYear();

let hours = dateObject.getHours();
let minutes = dateObject.getMinutes();
let seconds = dateObject.getSeconds();

/*let currentLog = fs.readFile("history.txt", "utf8", err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});*/

// Add the WebSocket handlers
io.on('connection', function(socket) {
    socket.on('outgoing message', function(data) { // When a message comes in...

        /*if ((data.length + 1) - (0 + 3) > 500) {

        }*/
        console.log(data);
        io.emit('incoming message', data); // Broadcast to all clients
        //date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
        fs.appendFile("history.txt", data + "\n", err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
    });
});

/// socket.emit('server message', data);