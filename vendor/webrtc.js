var users = [];
module.exports = function(socket){


	socket.on('register',function(data){
		socket.join(data.id);
		console.log('Joining:'+data.id);
		users.push(data.id);
		console.log(users);
		socket.emit('onmessage',{type:'register-success',id:data.id});
	});

	socket.on('send-offer',function(data){
		console.log('sending offer');
		socket.to(data.peerid).emit('offer',data);
	});

	socket.on('send-answer',function(data){
		console.log('sending answer');
		console.log(data);
		socket.to(data.peerid).emit('onmessage',data);
	});

	socket.on('send-candidate',function(data){
		console.log('send-candidate');
		socket.broadcast.emit('onmessage',data);
	});
}