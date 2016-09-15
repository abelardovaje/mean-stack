(function(){
	

	angular.module('auth')
		.controller('AuthController',authController);
		authController.$inject = ['auth'];
		function authController(auth){
			var vm = this;
			console.log('auth controller');
			

			vm.login = function(){
				auth.login();
			}



		}



})();