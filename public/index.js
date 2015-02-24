var app = angular.module('Goals', []);

//our front end requests must hit our api routes
app.controller('MainController', function($scope, GoalsFactory) {
	
	$scope.formData = {};

	GoalsFactory.get().success(function(data) {
		$scope.goals = data;
	}) 

	//when we click submit to create to do, we should be able to make post request and send that text to our api
	$scope.createToDo = function() {
		GoalsFactory.create($scope.formData).success(function(data) {
			$scope.formData = {};
			$scope.goals = data;
		})
	};

	$scope.completed = false;
	//delete item from list
	$scope.deleteToDo = function(id) {
		GoalsFactory.delete(id).success(function(data) {
			$scope.goals = data;
		})
	}

});
