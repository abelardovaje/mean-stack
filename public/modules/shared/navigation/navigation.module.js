(function(){
	angular.module('navigation',[])
		.directive('href',href);
		href.$inject = ['$window'];
		function href($window){
			return {
				restrict:'A',
				link:linkF
			}

			function linkF(scope,element,attr){
				element.on('click',function(){
					window.location.href = attr.href;
				});
			}
		}
})();