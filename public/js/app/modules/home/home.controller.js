
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

			
			for(var x = 0;x<16;x++){
				users[x] = {name:'user'+x,id:x};
			}
			
			bracket[0] = chunk(users);						
			//createBrackets(chunk(users).length);

			function createBrackets(l){
				var c = 2;
				for(var x = 0;x<=l;x++){
				
					l=l/c;							
					var arr = [];
					for(var y=0;y<l;y++){
						arr[y] = [
							{name:null,id:null},
							{name:null,id:null}
						];
					}							
					bracket[x+1] = arr;
					arr = [];
					if(l == 2){
						arr[0] = [
							{name:null,id:null},
							{name:null,id:null}
						]
						bracket[x+2] = arr;
					}			
				}

				console.log(bracket);
			}
			function chunk(array){

				var j = array.length,chunk = 2,temparray = [],i;
				var c = 0;
				for(i=0;i<j;i+=chunk){
					temparray[c] = array.slice(i,i+chunk);
					c++;
				}

				return temparray;

			}


		}

})();