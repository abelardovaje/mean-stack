(function(){

	angular.module('app')
		.factory('Peer',peer);
		peer.$inject = ['$q'];

		function peer($q){
			
			var pc = undefined;
			var socket = io.connect();
			var payload = {};
			var peerid = undefined;
			navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;
            var offerOptions = {
			  offerToReceiveAudio: 1,
			  offerToReceiveVideo: 1
			};  
			var service = {
				connect:connect,
				getMedia:getMedia,
				call:call,
				answer:answer,
				on:on,				
			}            
			return service;
						
			function socketConfig(option){
				socket = io.connect(option);
			}

			function connect(id,config){
				pc = new webkitRTCPeerConnection(config);
				_registerID(id);
				_onMessage();
			}

			function _registerID(id){
				socket.emit('register',{id:id});
			}

			function call(peerid,stream){

				_createOffer(peerid,stream);
			}

			function _createOffer(peerid,stream){
								
				/*
					Register the onaddstream handler. It handles the displaying of the video stream once it
					is received from the remote peer.
				*/
				pc.onaddstream = _gotRemoteStream;

				/*
					Adds a MediaStream as a local source of video or
					audio.
				*/
			    pc.addStream(stream);

			    /*
					Create an offer
			    */

			     pc.oniceconnectionstatechange = function() {
				    switch (pc.iceConnectionState) {
				      case 'disconnected':

				        break;
				      case 'failed':
				        console.log('iceConnectionState is disconnected, closing connections to ' + null);
				       
				        break;
				      case 'completed':
				     	console.log('completed');
				     	/*
							Register the onicecandidate handler. It sends any ICE candidates to the other peer, as
							they are received.
						*/
				        pc.onicecandidate = _onIceCandidate;
				        break;
				    }
				  };
			   
			    pc.createOffer(offerOptions).then(function(offer){
			    	console.log('creating offer');
			    	pc.setLocalDescription(offer,function(){
			    		socket.emit('send-offer',{type:'offer',offer:offer,peerid:peerid});
			    	});
			    	
			    },function(error){
			    	console.log('Creating offer error:',+err);
			    });
			    
			}

			function getMedia(){
				var deff = $q.defer();
				navigator.getUserMedia({ "audio": true, "video": true }, function (mediaStream) {
	    					    								       		      				       		      	 	
			      	 	deff.resolve(mediaStream);

			    }, function(err) {
			         console.log("The following error occurred: " + err.name);
				});

				return deff.promise;
			}

			function _onIceCandidate(event){
				
				if(event.candidate != null){
					socket.emit('send-candidate',{type:'candidate',candidate: event.candidate});
				}
				
			}

			function _gotRemoteStream(event){
				console.log("got remote stream");
			    console.log(event.stream);
			    remotevideo.src = URL.createObjectURL(event.stream);
			}

			function _onMessage(){
				socket.on('onmessage',function(data){
					
					switch(data.type){

						case 'register-success':
							console.log('Peer id:',data.id);							
						break;

						// case 'offer':
						// 	console.log('offer');
						// 	console.log(data);
						// 	getMedia().then(function(stream){
						// 		localstream = stream;	
						// 		pc.onicecandidate = onIceCandidate;
						// 		pc.onaddstream = gotRemoteStream;
						// 		pc.addStream(localstream);
						// 		console.log("RTCPeerConnection object was created");
						// 		console.log(pc);
						// 		pc.setRemoteDescription(new RTCSessionDescription(data.offer),function(){
									
						// 			/*
						// 				Create answer
						// 			*/
						// 			pc.createAnswer().then(function(answer){
						// 				console.log('hello');
						// 				pc.setLocalDescription(answer);
						// 				socket.emit('send-answer',{type:'answer',answer:answer,client:data.user});
						// 			},function(error){
						// 				console.log('err');
						// 			});


						// 		});

						// 	});
																					
						// break;

						case 'answer':												
							pc.setRemoteDescription(new RTCSessionDescription(data.answer),function(){								
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

			function answer(stream){
					console.log('Payload');
					console.log(payload.offer);
					pc.oniceconnectionstatechange = function() {
					    switch (pc.iceConnectionState) {
					      case 'disconnected':

					        break;
					      case 'failed':
					        console.log('iceConnectionState is disconnected, closing connections to ' + null);
					       
					        break;
					      case 'completed':
					     	console.log('completed');
					     	/*
								Register the onicecandidate handler. It sends any ICE candidates to the other peer, as
								they are received.
							*/
					        pc.onicecandidate = _onIceCandidate;
					        break;
					    }
				    };
					pc.onaddstream = _gotRemoteStream;
					pc.addStream(stream);
					console.log("RTCPeerConnection object was created");
					console.log(pc);
					pc.setRemoteDescription(new RTCSessionDescription(payload.offer),function(){
						
						
						//Create answer
						
						pc.createAnswer().then(function(answer){
							console.log('hello');
							pc.setLocalDescription(answer);
							socket.emit('send-answer',{type:'answer',answer:answer,peerid:payload.peerid});
						},function(error){
							console.log('err');
						});


					});
	
					
					

							
			}

			function on(type,cb){
				switch(type){
					case 'call':
						socket.on('offer',function(data){
							payload = data;							
							cb(service);
						});
					break;

					case 'stream':
						socket.on('offer',function(data){
							payload = data;							
							cb(service);
						});
					break;
				}				
			}

		}

})();