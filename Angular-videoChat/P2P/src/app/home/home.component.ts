import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private db: AngularFirestore){}
  @ViewChild('myVideo') myVideo: any;
  title = 'Home';

  targetPeer: any;
  targetPeer2: any;
  peer: any;
  text;
  text2;

  ngOnInit () {

    

    let video = this.myVideo.nativeElement;
    // Uncomment the next line for other browsers
    //navigator.getUserMedia = (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getUserMedia({video: true, audio: true}, (stream)=> {

      this.peer = new SimplePeer ({
        initiator: location.hash === '',
        trickle: false,
        stream: stream,

      }) 

      this.peer.on('signal', (data)=> {
        console.log(JSON.stringify(data));

        this.targetPeer = JSON.stringify(data); 
        from (this.db.doc('VideoIDs/IDs').update({P2P :this.targetPeer}))
        
      })
      this.db.doc('VideoIDs/IDs').valueChanges().subscribe(val => {
        this.targetPeer2 = val['P2Pr'];
      })

      this.peer.on('data', (data)=> {
        this.text2 = data

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
    
    console.log(this.targetPeer2)
    this.peer.signal(JSON.parse(this.targetPeer2));
  }

  message() {
    this.peer.send(this.text);

  }

}
