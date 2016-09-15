var route = require('../vendor/router');
var path = require('path');
var middlewares = require('./middlewares/middlewares');	

module.exports = {

	load:function(app){

		/*
			Storing app to use on the router module
		*/		
		route.setApp(app);


		/*
		|--------------------------------------------------------------------------
		| Application Routes
		|--------------------------------------------------------------------------
		|
		| Here is where you can register all of the routes for an application.
		| It's a breeze. Simply tell Laravel the URIs it should respond to
		| and give it the controller to call when that URI is requested.
		| 
		*/

		route.get('/login','AuthenticationController@login',middlewares.auth);
		route.get('/register','AuthenticationController@register',middlewares.auth);
		route.get('/','HomeController@index');				
		route.get('/store','HomeController@store');
  		route.get('/create','HomeController@create');

  		route.post('/login','AuthenticationController@login');

		route.all('/*',function(req,res){

			res.sendFile(path.join(__dirname, '../resources/views', 'index.html'));
						
		});

	}



}





