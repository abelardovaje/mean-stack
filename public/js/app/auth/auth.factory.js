(function(){

	angular.module('auth')
		.factory('auth',auth);

		auth;$inject = ['$http'];

		function auth($http){

			return {
				login:login,
				register:register
			}

			function login(credentials){
				
				$http.post('/login',credentials).then(function(res){

					if(res.data){
						window.location.assign('/');
					}else{
						alert('Invalid credentials');
					}							
					
				},function(err){
					console.log(err);
				});

			}

			function register(data){

				$http.post('/register',data).then(function(res){
					if(res.data){
						window.location.assign('/');
					}else{
						alert('username already exist');
					}
				});

			}
		}


})();