var path = require('path');
var auth = require('../../vendor/authentication');	
module.exports = function (method){

	var methods = {

		login:login,
		register:register
		
	};

	return methods[method]();

	function login(){
			
			return function (req,res,next){
				
				if(!req.route.methods.get){	

				
					auth.attempt({email:'abel@gmail.com',password:'12346'});

					req.session.islogin = true;					
					res.json('true');
					
				}else{
					res.sendFile(path.join(__dirname, '../../resources/views/auth', 'index.html'));
				}
							
			}

	}

	function register(){
			return function (req,res,next){
				
				res.sendFile(path.join(__dirname, '../../resources/views/auth', 'index.html'));
				
			}
	}



	
	
}