(function(){
	angular.module('app')
		.controller('appController',appController);

		appController.$inject = ['$cookies','$http'];
		function appController($cookies,$http){
			console.log('App controller');
			

		}
})();