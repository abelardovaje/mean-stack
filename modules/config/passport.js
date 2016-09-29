var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var schemas = require('../schemas/index');
module.exports = function(app){

	passport.use(new LocalStrategy.Strategy(function(username,password,done){
			
			schemas.user.find({username:username})
			.where('password').equals(password)
			.exec(function(err,user){
				if(err) throw err;
					
					if(user.length == 0){
						 return done(null, false, {
				          message: 'User not found'
				        });
					}else{
						
						done(null,{id:user[0]._id,name:username});
					}
					
			});		
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user,done){
		done(null,user.id);
	});

	passport.deserializeUser(function(id,done){
		schemas.user.findById(id,{'name':1, 'email':1,'status':1},function(err,user){
			done(err,user);
		})
	});
}

