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


.directive('sfBuilderControls', [function(){
	return {
		restrict: 'A',
		require: '?^^sfBuilder',
		priority: -1000,
		scope: false,
		link: function link(scope, element, attrs, sfBuilder) {

			// only apply this if we're inside 
			if(!sfBuilder) return;


			// make draggable
			element.attr('draggable', 'true');


			// the controls DOM
			var controls = angular.element('<div class="sf-builder-controls-handle"></div>')[0];
			element.addClass('sf-builder-controls');


			// add the controls DOM
			element.append(controls);

			// if the controls DOM got removed, add it back
			new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					for (var i = mutation.removedNodes.length - 1; i >= 0; i--) {
						if(mutation.removedNodes[i] != controls) continue;
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



