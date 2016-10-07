var schemas = require('../schemas/index');
module.exports = {


	loadRooms:function(){
		return schemas.rooms.find({},function(err,room){
			return room;
		})
	},

	joinroom:function(data){
			
		var roomMembers = new schemas.roomMembers;
		roomMembers.rid = data.rid;
		roomMembers.uid = data.uid;
		roomMembers._user = data.uid;
		return roomMembers.save();

	},

	loadMembers:function(id){
		return schemas.roomMembers.find({rid:id})
			.populate('_user')
			.exec();
	},

	leaveRoom:function(data){
		return schemas.roomMembers.find({uid:data.uid})
			   .where('rid').equals(data.rid)
			   .remove();
	}


}