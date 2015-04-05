angular.module('builder', ['schemaForm'])



.directive('schemaFormBuilder', [function(){
	return {
		templateUrl: 'template.html',
		restrict: 'EA',
		transclude: false,
		scope: {
			options: '=sfBuilderOptions',
			schema: '=sfBuilderSchema',
			form: '=sfBuilderForm'
		},
		link: function link(scope, element, attrs, controller, transclude) {
			
		},
		controller: ['$scope', function($scope){
			$scope.model = {};
		}]
	}
}])









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




