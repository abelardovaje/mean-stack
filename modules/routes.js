var route = require('../vendor/router');
var path = require('path');
var middlewares = require('./middlewares/middlewares');	
var passport = require('passport');
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
		app.post('/api',function(req,res,next){
			res.send('hello');
		});
		route.get('/login','UserController@login',middlewares.auth);
		route.get('/register','UserController@register',middlewares.auth);		
  		route.post('/login','UserController@login');
  		route.get('/isLogin','UserController@isLogin');
  		route.post('/register','UserController@register');
  		app.get('/logout',function(req,res){
  			req.logout();
  			res.redirect('/');
  		});


  		//Rooms
  		route.get('/loadrooms','RoomController@loadRooms');
  		route.post('/joinroom','RoomController@joinRoom');
  		route.post('/leaveroom','RoomController@leaveRoom');
				
		route.all('/*',function(req,res){

			res.sendFile(path.join(__dirname, '../resources/views', 'index.html'));
						
		});

	}



}





