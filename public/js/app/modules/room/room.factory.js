(function(){

	angular.module('app')
		.factory('roomService',roomService);

		roomService.$inject = ['$http'];
		function roomService($http){
			return {

				joinRoom:joinRoom,
				leaveRoom:leaveRoom

			}

			function joinRoom(data){
				return $http.post('/joinroom',data).then(function(res){
					return res.data;
				});
			}

			function leaveRoom(data){
				return $http.post('/leaveroom',data).then(function(res){
					return res.data;
				});
			}
		}


})();