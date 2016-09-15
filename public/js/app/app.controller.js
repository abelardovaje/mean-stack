(function(){
	angular.module('app')
		.controller('appController',appController);

		appController.$inject = [];
		function appController(){
			console.log('App controller');
		}
})();