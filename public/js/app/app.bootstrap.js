
deferredBootstrapper.bootstrap({
  element: document.body,
  module: 'app',
  resolve: {
    isAuthenticate: ['$http', function ($http) {  	
      return $http.get('isLogin').then(function(res){
      	return res.data;
      });
    }]
  }
});