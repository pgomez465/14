import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('myVideo') myVideo: any;

  title = 'P2P';

  targetPeer: any;
  peer: any;

  ngOnInit () {

    let video = this.myVideo.nativeElement;
    // Uncomment the next line for other browsers
    //navigator.getUserMedia = (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getUserMedia({video: true, audio: true}, (stream)=> {

      this.peer = new SimplePeer ({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream,

      }) 

      this.peer.on('signal', (data)=> {
        console.log(JSON.stringify(data));

        this.targetPeer = data; 
      })

      this.peer.on('data', (data)=> {
        console.log('Recieved DATA: ' + data);

      })

      this.peer.on('stream', (stream)=> {
        video.srcObject = stream;
        video.play();
      })

    }, (err)=> {
      console.log('Connection Error' + err);
    })
  }

  connect() {
    this.peer.signal(JSON.parse(this.targetPeer));
  }

  message() {
    this.peer.send('Hello World');
  }

}
