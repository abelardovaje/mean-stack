(function(){
	angular.module('app')
		.controller('WebRTCController',WebRTCController);
		WebRTCController.$inject = ['Peer'];

		function WebRTCController(Peer){
			var vm = this;
			var randId = Math.random().toString(36).substring(7);
			Peer.connect(randId,{ "iceServers": [{ "url": "stun:stun.l.google.com:19302" }]});
			var localstream = undefined;
			var localVideo = document.getElementById('localvideo');
			
			Peer.getMedia().then(function(mediaStream){						
				localstream = mediaStream;
				localVideo.src = URL.createObjectURL(mediaStream);
			});

			vm.peerid = undefined;
			vm.call = call;

			function call(){
				Peer.call(vm.peerid,localstream);
			}

			Peer.on('call',function(call){
				
				call.answer(localstream);
				
			});

		}

})();