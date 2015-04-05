'use strict';

angular.module('schemaFormBuilder', ['schemaForm'])


// extend the decorator with builder controls
.config(function($provide){

	// TODO: we need to extend ALL registered decorators somehow...
	$provide.decorator('bootstrapDecoratorDirective', function ($delegate, $compile) {
		var directive = $delegate[0];
		var link = directive.link;

		directive.compile = function(){
			return function(scope, element, attrs){

				// we've already injected the builder controls directive
				if(typeof attrs.sfBuilderControls !== 'undefined')
					return link.apply(this, arguments);

				// inject the builder controls directive
				element.attr('sf-builder-controls', '');
				$compile(element)(scope);
			};
		};

		return $delegate;
	});
})

.directive('sfBuilder', [function(){
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

			// inspect a form item
			this.inspectItem = function(item) {
				$scope.$apply(function(){
					$scope.inspected = item;
				});
			};





			$scope.model = {};
			$scope.types = {
				text: {
					title: 'Text',
					schema: {
						type: 'object',
						properties: {
							title:  { 'type': 'string' },
							description:  { 'type': 'string' }
						}
					},
					form: [
						'title',
						'description'
					]
				},
				password: {
					title: 'Password',
					schema: {
						type: 'object',
						properties: {
							title:  { 'type': 'string' },
							description:  { 'type': 'string' }
						}
					},
					form: [
						'title',
						'description'
					]
				}
			}


		}]
	}
}])


.directive('sfBuilderDesigner', [function(){
	return {
		restrict: 'EA',
		require: ['^^sfBuilder'],
		scope: false,
		controller: ['$scope', function($scope){}]
	}
}])


.directive('sfBuilderPallette', [function(){
	return {
		restrict: 'EA',
		require: ['^^sfBuilder'],
		scope: false,
		controller: ['$scope', function($scope){}]
	}
}])


.directive('sfBuilderInspector', [function(){
	return {
		restrict: 'EA',
		require: ['^^sfBuilder'],
		scope: false,
		controller: ['$scope', function($scope){}]
	}
}])


.directive('sfBuilderControls', [function(){
	return {
		restrict: 'A',
		require: ['?^^sfBuilder', '?^^sfBuilderDesigner'],
		priority: -1000,
		scope: false,
		link: function link(scope, element, attrs, controllers) {
			var sfBuilder = controllers[0];
			var sfBuilderDesigner = controllers[1];


			// only apply this if we're inside the designer
			if(!sfBuilder || !sfBuilderDesigner) return;

			// make draggable
			element.attr('draggable', 'true');

			// the parent 
			element.addClass('sf-builder-decorator');
			element.on('click', function(event){
				sfBuilder.inspectItem(scope.form)
			});


			// the controls DOM
			var controls = angular.element('<div></div>');
			controls.append('<div class="sf-builder-controls-handle"></div>');


			// add the controls DOM
			element.append(controls);

			// if the controls DOM got removed, add it back
			new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					for (var i = mutation.removedNodes.length - 1; i >= 0; i--) {
						if(mutation.removedNodes[i] != controls[0]) continue;
						element.append(controls);
					};
				});
			}).observe(element[0], {
				attributes: false,
				childList: true,
				characterData: false
			});
			 
		},
		controller: ['$scope', function($scope){

		}]
	}
}])



