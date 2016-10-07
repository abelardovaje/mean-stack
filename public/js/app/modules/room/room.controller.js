(function(){

	angular.module('app')
		.controller('RoomController',roomController);

		roomController.$inject = ['$stateParams','roomService'];
		function roomController($stateParams,roomService){

			var vm = this;
			var rid = $stateParams.id;
			vm.members = [];
			roomService.joinRoom({rid:rid}).then(function(res){
				vm.members = res;
				for(var x in res){
					vm.members[x] = res[x]._user[0];					
				}
			});

		}

})();