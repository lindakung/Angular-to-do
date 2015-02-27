var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));


//define our model
var Todo = mongoose.model('Todo', {
	text: String,
	comments: [String]
});

module.exports = Todo;