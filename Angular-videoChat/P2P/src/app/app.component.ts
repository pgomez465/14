import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'P2P';

  targetPeer: any;
  peer: any;

  ngOnInit () {
    this.peer = new SimplePeer ({
      initiator: location.hash === '#init',
      trickle: false,


    }) 

    this.peer.on('signal', (data)=> {
      console.log(JSON.stringify(data));

      this.targetPeer = data; 
    })

    this.peer.on('data', (data)=> {
      console.log('Recieved DATA: ' + data);

    })
  }

  connect() {
    this.peer.signal(JSON.parse(this.targetPeer));
  }

  message() {
    this.peer.send('Hello World');
  }

}
