var ctrl = require('./controller');

module.exports = {

	config:{
		app:null,
		callback:function(res,req,next){
			next();
		}
	},

	setApp:function(app){

		this.config.app = app;

	},
	get:function(uri,controller,auth){
			
		var str = controller.split('@');	
		this.config.app.get(uri,(auth) ? auth : this.config.callback,ctrl(str[0],str[1]));
		return this;
		
	},
	post:function(uri,controller,auth){

		var str = controller.split('@');
		console.log(auth);		
		this.config.app.post(uri,(auth) ? auth : this.config.callback,ctrl(str[0],str[1]));

	},
	all:function(uri,callback){
		this.config.app.all(uri,function(req,res){			
			callback(req,res);
		});	   
	}




}