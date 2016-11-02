
(function(){
	
	angular.module('app')
		.controller('HomeController',homeController);
		homeController.$inject = ['homeService'];
		function homeController(homeService){
			var vm = this;
			var users = [];
			var bracket = [];
			//console.log(homeService);
			homeService.loadRooms().then(function(res){
				console.log(res);
				vm.rooms = res;
			});


		}

})();