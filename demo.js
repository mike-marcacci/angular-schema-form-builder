angular.module('demo', ['schemaFormBuilder'])

.controller('demo', function($scope){
	$scope.schema = {
		"type": "object",
		"title": "Text",
		"properties": {
			"title":  { "type": "string" },
			"description":  { "type": "string" }
		}
	};
	$scope.form = ["*"];
})