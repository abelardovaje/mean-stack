(function(){

	angular.module('app')
		.config(config);
		config.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
		function config($stateProvider,$urlRouterProvider,$locationProvider){

			$urlRouterProvider.otherwise("page not found");
			
			$stateProvider				
				.state('home',{
					url:'/',														
					views:{
						'header':{templateUrl:'layouts/header.html'},
						'content':{
							templateUrl:'web/home.html',
							controller:'HomeController',
							controllerAs:'hc',
						}
					},
					resolve:{
						
						oclazyload:['$ocLazyLoad',function($ocLazyLoad){
							return $ocLazyLoad.load([{
								files:[									
									'public/js/app/modules/home/home.controller.js',																	
								]
							}])
						}]

					}		
				})	
				.state('tournament',{
					url:'/tournament',
					views:{
						'content':{
							template:'<h2>Tournament</h2>'
						}
					}
					
				});			
				
				
			 $locationProvider.html5Mode(true);
		}

})();