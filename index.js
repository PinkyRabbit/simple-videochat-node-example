// index.js
navigator.webkitGetUserMedia({video: true, audio: false}, function(stream){
  
  var Peer = require('simple-peer');
  var wrtc = require('wrtc');
  var peer = new Peer({
    wrtc: wrtc,
    initiator: location.hash === "#init",
    trickle: false,
    stream: stream
  });
  
  peer.on('signal', function(data) {
    document.getElementById('your-id').value = JSON.stringify(data);
  });
  
  document.getElementById('connect').addEventListener('click', function(e) {
    var otherId = JSON.parse(document.getElementById('other-id').value);
    peer.signal(otherId);
  });
  
  document.getElementById('send').addEventListener('click', function(e) {
    var yourMessage = document.getElementById('yr-message').value;
    peer.send(yourMessage);
  });
  
  peer.on('data', function(data) {
    document.getElementById('messages').textContent += data + '\n';
  });
  // index.js
  peer.on('stream', function(stream) {
    var video = document.createElement('video');
    document.body.appendChild(video);
    // got remote video stream, now let's show it in a video tag

    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
  
},function(err){
  console.error(err);
});
