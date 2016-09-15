var user = require('../modules/models/user');
module.exports = {

	attempt:function(credentials,req){
		
		var promise = user.find({email:credentials.email})
			.where('name').equals('abel')
			.exec(function(err,user){
				if(err) throw err

			});

			return promise.then(function(res){

				if(res){
					console.log(res);
					console.log('true');
					return true;
				}
			});

			


	},
	check:function(){

	}

}