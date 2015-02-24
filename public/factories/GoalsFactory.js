app.factory('GoalsFactory', function($http) {
	//get goals
	return {
		get: function() {
			return $http.get('api/goals');
		},
		create: function(data) {
			return $http.post('api/goals', data)
		},
		delete: function(id) {
			return $http.delete('api/goals/' + id)
		}

	}
})