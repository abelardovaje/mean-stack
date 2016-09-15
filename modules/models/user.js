var mongoose = require('mongoose');
 var userSchema = new mongoose.Schema({

 	name:{
 		type:String,
 		require:true
 	},
 	email:{
 		type:String,
 		require:true
 	},
 	password:{
 		type:String,
 		require:true
 	},
 	status:{
 		type:String
 	},
 	create_at:{
 		type:Date
 	}

 });


 module.exports = mongoose.model('Users',userSchema);