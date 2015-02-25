app.factory('GoalsFactory', function($http) {
	//get goals
	return {
		get: function() {
			return $http.get('/goals');
		},
		create: function(data) {
			return $http.post('/goals', data)
		},
		delete: function(id) {
			return $http.delete('/goals/' + id)
		}

	}
})