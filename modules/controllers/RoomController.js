var room= require('../models/room.model');
module.exports = function (method){

	var methods = {

		loadRooms:loadRooms,
		joinRoom:joinRoom,
		leaveRoom:leaveRoom
		
		
	};

	return methods[method]();

	function loadRooms(){
			
		return function(req,res,next){

			room.loadRooms().then(function(data){
				res.json(data);
			});
			
		}
	}

	function joinRoom(){
		return function(req,res,next){

			/*
				Add user on room_members collections
				Load all members on the room except user data
			*/
			var data = {
				rid:req.body.rid,
				uid:req.user._id
			}

			room.joinroom(data).then(function(data){						
				room.loadMembers(req.body.rid).then(function(members){					
					res.json(members);
				});								
			});								
		}
	}

	function leaveRoom(){
		return function(req,res,next){

			room.leaveRoom({uid:req.user.id,rid:req.body.rid}).then(function(data){
				if(data.result.n > 0){
					res.json(true);
				}else{
					res.json(false);
				}
			});

			
		}
	}

	



	
	
}