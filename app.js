var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/todoapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var app = express();

var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vd.api+json'}));


//define our model
var Todo = mongoose.model('Todo', {
	text: String
})

//api routes
//get all our todos
app.get('/api/goals', function(req, res) {
	Todo.find(function(err, todos) {
		if(err) res.send(err)
			res.json(todos);
	});
});

//create todo and send back from created
app.post('/api/goals', function(req, res) {
	Todo.create({
		text: req.body.text,
	}, function(err, todo) {
		if(err) res.send(err);

		Todo.find(function(err, todos) {
			if(err) res.send(err)
				res.json(todos);
		});
	});
});

//delete a todo
app.delete('/api/goals/:id', function(req, res) {
	    Todo.remove({
            _id : req.params.id
        }, function(err, todo) {
            if (err)
                res.send(err);

		Todo.find(function(err, todos) {
			if(err) res.send(err)
				res.json(todos);
		});
	});
});

//display our index.html
app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});

var server = app.listen(3000);
console.log("App listening on port 3000");