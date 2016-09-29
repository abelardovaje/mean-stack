var path = require('path');
var passport = require('passport');
var jwt = require('../config/jwt');
var model = require('../models/index.model');
module.exports = function (method){

	var methods = {

		login:login,
		register:register,
		getuser
		
	};

	return methods[method]();

	function login(){
			
			return function (req,res,next){
			
				if(!req.route.methods.get){	

					passport.authenticate('local',function(err,user,info){
						if(err){

							res.status(404).json(err);
							return;
						}
						
						if(user){														
							req.logIn(user, function(err) {
						      if (err) { return next(err); }
						      res.json(true);
						    });
						}else{							
							res.json(false);
						}
					})(req,res);
					
										
				}else{
					res.sendFile(path.join(__dirname, '../../resources/views/auth', 'index.html'));
				}
							
			}

	}

	function register(){
			return function (req,res,next){
				
				if(!req.route.methods.get){
					var credentials = {username:req.body.username,password:req.body.password};
					model.user.register(credentials).then(function(response){
						if(response.length != 0){
							res.json(false);
						}else{

							/*
								Auto login after register
							*/
							passport.authenticate('local',function(err,user,info){
								if(err){

									res.status(404).json(err);
									return;
								}
								
								if(user){														
									req.logIn(user, function(err) {
								      if (err) { return next(err); }
								      res.json(true);
								    });
								}else{							
									res.json(false);
								}
							})(req,res);


						}
					});
					
				}else{
					res.sendFile(path.join(__dirname, '../../resources/views/auth', 'index.html'));
				}
								
			}
	}


	function getuser(){
		return function(req,res,next){
			res.json(req.user)
		}
	}



	
	
}