(function(){

	angular.module('auth')
		.factory('auth',auth);

		auth;$inject = ['$'];

		function auth($){

			return {
				login:login,
				register:register
			}

			function login(credentials){

				$.post('/login',{id:1}).then(function(res){
					console.log(res);
					window.location.assign('/');
				});

			}

			function register(){

			}
		}


})();