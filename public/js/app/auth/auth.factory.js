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
				
				$.post('/login',credentials).then(function(res){

					if(res){
						window.location.assign('/');
					}else{
						alert('Invalid credentials');
					}							
					
				},function(err){
					console.log(err);
				});

			}

			function register(data){

				$.post('/register',data).then(function(res){
					if(res){
						window.location.assign('/');
					}else{
						alert('username already exist');
					}
				});

			}
		}


})();