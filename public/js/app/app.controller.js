(function(){
	angular.module('app')
		.controller('appController',appController);

		appController.$inject = ['$cookies','$http','$scope','$q'];
		function appController($cookies,$http,$scope,$q){
			var vm = this;
			var localstream = undefined,remotevideo = undefined;
			var socket = io.connect();
			vm.username = undefined;
			var offerOptions = {
			  offerToReceiveAudio: 1,
			  offerToReceiveVideo: 1
			}; 
			var pc = new webkitRTCPeerConnection({ "iceServers": [{ "url": "stun:stun.l.google.com:19302" }] });
			navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

            handleSocketEvents();
            vm.login = function(){
            	socket.emit('login',{uname:vm.username});
            }             
			vm.call = function(){

				/*
					Get video and audio
				*/
				getMedia().then(function(stream){
					localstream = stream;	
					createOffer();
					console.log("RTCPeerConnection object was created");
					console.log(pc);

				});
					
			}	


			function createOffer(){
				
				
				/*
					Register the onaddstream handler. It handles the displaying of the video stream once it
					is received from the remote peer.
				*/
				pc.onaddstream = gotRemoteStream;

				/*
					Adds a MediaStream as a local source of video or
					audio.
				*/
			    pc.addStream(localstream);

			    /*
					Create an offer
			    */

			     pc.oniceconnectionstatechange = function() {
				    switch (pc.iceConnectionState) {
				      case 'disconnected':

				        break;
				      case 'failed':
				        console.log('iceConnectionState is disconnected, closing connections to ' + peerId);
				       
				        break;
				      case 'completed':
				     	console.log('completed');
				     	/*
							Register the onicecandidate handler. It sends any ICE candidates to the other peer, as
							they are received.
						*/
				         pc.onicecandidate = onIceCandidate;
				        break;
				    }
				  };
			   
			    pc.createOffer(offerOptions).then(function(offer){
			    	console.log('creating offer');
			    	pc.setLocalDescription(offer,function(){
			    		socket.emit('send-offer',{type:'offer',offer:offer,client:'user1',user:vm.username});
			    	});
			    	
			    },function(error){
			    	console.log('Creating offer error:',+err);
			    });
			    
			}

			function getMedia(){
				var deff = $q.defer();
				navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
	    					    								       		      
				        localVideo = document.getElementById('localvideo');
				        remotevideo = document.getElementById('remotevideo');
			      	 	localVideo.src = URL.createObjectURL(stream);			      	 	
			      	 	deff.resolve(stream);

			    }, function(err) {
			         console.log("The following error occurred: " + err.name);
				});

				return deff.promise;
			}

			function onIceCandidate(event){
				
				if(event.candidate != null){
					socket.emit('send-candidate',{type:'candidate',candidate: event.candidate});
				}
				
			}

			function gotRemoteStream(event){
				console.log("got remote stream");
			    console.log(event.stream);
			    remotevideo.src = URL.createObjectURL(event.stream);
			}


			function handleSocketEvents(){

				socket.on('login-success',function(){
					console.log('login success!');
				});

				socket.on('message',function(data){
					// console.log(data);
					switch(data.type){

						case 'offer':
							console.log('offer');
							console.log(data);
							getMedia().then(function(stream){
								localstream = stream;	
								pc.onicecandidate = onIceCandidate;
								pc.onaddstream = gotRemoteStream;
								pc.addStream(localstream);
								console.log("RTCPeerConnection object was created");
								console.log(pc);
								pc.setRemoteDescription(new RTCSessionDescription(data.offer),function(){
									
									/*
										Create answer
									*/
									pc.createAnswer().then(function(answer){
										console.log('hello');
										pc.setLocalDescription(answer);
										socket.emit('send-answer',{type:'answer',answer:answer,client:data.user});
									},function(error){
										console.log('err');
									});


								});

							});
															
						
						break;

						case 'answer':
							
							pc.setRemoteDescription(new RTCSessionDescription(data.answer),
								function(){
									console.log('user answer');

								});
						break;


						case "candidate":
							console.log('candidate');
							console.log(data);
							pc.addIceCandidate(new RTCIceCandidate(data.candidate),function(){
								trace(' addIceCandidate success');
							},function(error){
								 trace(' failed to add ICE Candidate: ' + error.toString());
							});

						break;

					}

				});

			}

		}
})();