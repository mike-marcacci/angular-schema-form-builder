angular.module('demo', ['schemaFormBuilder'])

.controller('demo', function($scope){
	$scope.schema = {
		"type": "object",
		"properties": {
			"name":  { "type": "string" },
			"email":  { "type": "string" },
			"password":  { "type": "string" }
		}
	};
	$scope.form = [
		'name',
		'email',
		{
			key: 'password',
			type: 'password',
			description: 'This doesn\'t appear to work...'
		}
	];
})