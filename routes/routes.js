
var express = require('express');
var router = express.Router();
var Todo = require('../models/todo.js');


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
		text: req.body.text
	}, function(err, todo) {
		if (err) res.send(err);

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

		Todo.find(function(err, todos) {
			if(err) res.send(err)
				res.json(todos);
		});
	});
});

module.exports = router;