var mongoose = require('mongoose');

var messagesSchema = new mongoose.Schema({

	user_id:{
		type:Number,
		require:true
	},
	message:{
		type:String,
		require:true
	}


});


module.exports = mongoose.model('Message',messagesSchema);