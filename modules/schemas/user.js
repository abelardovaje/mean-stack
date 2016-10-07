var mongoose = require('mongoose'),Schema = mongoose.Schema;
var crypto = require('crypto');

 var userSchema = new mongoose.Schema({

 	name:{
 		type:String,
 		require:true
 	},
 	username:{
 		type:String,
 		require:true
 	},
 	password:{
 		type:String,
 		require:true,
 		select:false
 	},
 	status:{
 		type:String
 	},
 	create_at:{
 		type:Date
 	},
 	roomMembers:[{type:Schema.Types.ObjectId,ref:'RoomMembers'}]

 });

userSchema.methods.setPassword = function(password){
 	this.salt = crypto.randomBytes(16).toString('hex');
  	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};


 module.exports = mongoose.model('Users',userSchema);