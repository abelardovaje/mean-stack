(function(){

	angular.module('auth')
		.config(config);
	config.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
	function config($stateProvider,$urlRouterProvider,$locationProvider){
		console.log('sdsd');
		$urlRouterProvider.otherwise("page not found");
		$stateProvider
			.state('login',{
				url:'/login',
				views:{
					'content':{
						templateUrl:'auth/login.html'
					}
				}
			}).state('register',{
				url:'/register',
				views:{
					'content':{
						templateUrl:'auth/register.html'
					}
				}
			});


		$locationProvider.html5Mode(true);

	}	

})();