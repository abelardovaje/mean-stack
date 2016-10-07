(function(){

	angular.module('app')
		.config(config)
		.run(run);
		config.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider'];
		
		function run($rootScope, $state, $location,$http,isAuthenticate){
			 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
			 				 	
			 	if(toState.data.requireLogin && !isAuthenticate){
			 		 alert('Please login first to join a room');			 			 		
			 		 window.location.href="login";
			 		 event.preventDefault();
			 		 return;
			 	}
			 });
		}

		function config($stateProvider,$urlRouterProvider,$locationProvider){

			$urlRouterProvider.otherwise("/");
			
			$stateProvider				
				.state('home',{
					url:'/',
					data:{requireLogin:false},													
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
									'public/js/app/modules/home/home.factory.js',																	
								]
							}])
						}]

					}		
				})	
				.state('room',{
					url:'/room/:id',
					data:{requireLogin:true},					
					views:{

						'header':{
							templateUrl:'layouts/header.html'
						},
						'content':{
							templateUrl:'web/room.html',
							controller:'RoomController',
							controllerAs:'rc'
						}
					},
					resolve:{
						oclazyload:['$ocLazyLoad',function($ocLazyLoad){
							return $ocLazyLoad.load([{
								files:[									
									'public/js/app/modules/room/room.controller.js',
									'public/js/app/modules/room/room.factory.js',																										
								]
							}])
						}]
					},
					onExit:['roomService','$stateParams',function(roomService,$stateParams){
						roomService.leaveRoom({rid:$stateParams.id}).then(function(res){
							console.log(res);
						});
					}]
				
					
				});			
				
				
			 $locationProvider.html5Mode(true);
		}

})();