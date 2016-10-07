var mongoose = require('mongoose');


var roomSchema = mongoose.Schema({

	name:{
		type:String,
		require:true
	},
	status:{
		type:Number,
		require:true
	}


});


module.exports = mongoose.model('Room',roomSchema);