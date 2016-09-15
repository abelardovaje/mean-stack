(function(){

	angular.module('app')
		.factory('$',appService);

		appService.$inject = ['$http'];

		function appService($http){

			return {
				get:get,
				post:post,
				test:test
			}


			function get(url,params){
				return $http.get(url,{params:params}).then(function(response){

					return response.data;

				});
			}

			function post(url,data){
				return $http.post(url,{data:data}).then(function(response){
					
					return response.data;

				});
			}

			function test(){
				alert('test');
			}

		}

})();