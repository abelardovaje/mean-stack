(function(){
	

	angular.module('auth')
		.controller('AuthController',authController);
		authController.$inject = ['auth'];
		function authController(auth){
			var vm = this;
			vm.username = '';
			vm.password ='';

			vm.login = function(){
				
				auth.login({username:vm.username,password:vm.password});

			}

			vm.register = function(){

				auth.register({username:vm.username,password:vm.password});
				
			}



		}



})();