(function(){

	angular.module('app')
		.directive('accordion',accordion)
		.directive('expander',expander);

		function accordion(){
			return {
				restrict:'E',
				transclude:true,
				scope:{
					title:'@'
				},
				controller:accordionController,
				controllerAs:'ac',
				template:'<div ng-transclude></div>',
				link:linkF,
				bindToController:true
				
			}

			function accordionController(){
				var vm = this;
				alert(vm.title);
			}

			function linkF(){}
		}

		function expander(){
			return {
				restrict:'E',
				transclude:true,
				require:['^accordion'],
				scope:{
					sample:'@'
				},
				controller:expanderController,
				controllerAs:'ec',
				template:'<div ng-transclude></div>',
				link:linkF,
				bindToController:true,
				

			}

			function expanderController(){
				var vm = this;
				alert(vm.sample);

			}

			function linkF(scope,element,attr,accCtrl){
				console.log(accCtrl);
				
			}
		}

})();