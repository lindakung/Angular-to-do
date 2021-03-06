var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var socketio = require('socket.io');


var app = express();


app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vd.api+json'}));




var port = 8080;
var server = app.listen(port, function() {
	console.log('Server listening on port', port);
});

var io = socketio.listen(server);
app.use('/', require('./routes/routes.js')(io));

// io.on('connection', function(socket){
//     socket.emit('message', {'message': 'hello world'});
// });


//serve root

// io.on('connection', function(socket) {
// 	console.log('someone has connected');
// 

module.exports = app;
