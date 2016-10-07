var mongoose = require('mongoose');

var roomMembersSchema = new mongoose.Schema({

	rid:{
		type:String,
		require:true,
		select:false,
	},
	uid:{
		type:String,
		require:true,
		select:false,
	},
	_user:[{type:String,ref:'Users'}]

});


module.exports = mongoose.model('RoomMembers',roomMembersSchema);