var schemas = require('../schemas/index');
module.exports = {


	login:function(credentials,req){
		
		return schemas.user.find({email:credentials.email})
			.where('password').equals(credentials.password)
			.exec(function(err,user){
				if(err) throw err
			});

	},

	register:function(credentials){
			var users = new schemas.user;
			users.username = credentials.username;
			users.password = credentials.password;
			
			/*
				Check if credentials is already exist
			*/

			return schemas.user.find({username:credentials.username},function(err,user){
				if(err) throw err;
					
					/*
						Save new user
					*/

					if(user.length == 0){
						
						users.save(function(err,user){
							console.log('save');
							console.log(user);
						});
						
					}	

			});
			
			
	},


}