navigator.getUserMedia({video: true, audio: true}, function (stream) {
    var Peer = require('simple-peer')
    var peer = new Peer({
      initiator: location.pathname === '/',
      trickle: false,
      stream: stream
    })
  
    peer.on('signal', function (data) {
      document.getElementById('yourId').value = JSON.stringify(data)
    })
  
    document.getElementById('connect').addEventListener('click', function () {
      var otherId = JSON.parse(document.getElementById('otherId').value)
      peer.signal(otherId)
    })
  
    document.getElementById('send').addEventListener('click', function () {
      var yourMessage = document.getElementById('yourMessage').value
      peer.send(yourMessage)
    })
  
    peer.on('data', function (data) {
      document.getElementById('messages').textContent += data + '\n'
    })
  
    peer.on('stream', function (stream) {
      var video = document.getElementById('video')
      video.srcObject = stream
      video.play()
    })
},function (err) {
    console.log(err)
})