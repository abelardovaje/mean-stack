(function(){

	angular.module('app')
		.factory('homeService',homeService);
		homeService.$inject = ['$http'];
		function homeService($http){
			return {
				loadRooms:loadRooms
			}



			function loadRooms(){
				return $http.get('/loadrooms').then(function(res){
					return res.data;
				});
			}
		}

})();