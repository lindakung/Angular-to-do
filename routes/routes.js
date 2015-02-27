
var express = require('express');
var router = express.Router();
var Todo = require('../models/todo.js');


function routes(io) {
	//get all our todos 
	router.get('/goals', function(req, res) {
		Todo.find(function(err, todos) {
			if(err) res.send(err)
				res.json(todos);
		});
	});

	//create todo and send back from created
	router.post('/goals', function(req, res) {
		Todo.create({
			text: req.body.text,
			comments: req.body.comments
		}, function(err, todo) {
			if (err) res.send(err);
			io.emit('new_goal', todo);


			Todo.find(function(err, todos) {
				if (err) res.send(err)
					res.json(todos);
			});

		});
	});

	//delete a todo
	router.delete('/goals/:id', function(req, res) {
		 Todo.remove({
	            _id : req.params.id
	        }, function(err, todo) {
	            if (err) res.send(err);
	            console.log('heyheyheyheyhey', req.params.id);
	            io.emit('delete_goal', req.params.id);

			Todo.find(function(err, todos) {
				if(err) res.send(err)
					res.json(todos);
			});
		});
	});
	return router;
}

module.exports = routes;