import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: '', component: AppComponent },
 
]

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBRJiyk9F84Cd2icXjurXKvglvHsBLipvY",
      authDomain: "videochat-91724.firebaseapp.com",
      databaseURL: "https://videochat-91724.firebaseio.com",
      projectId: "videochat-91724",
      storageBucket: "videochat-91724.appspot.com",
      messagingSenderId: "338028970834",
      appId: "1:338028970834:web:3450073657d275fc22708b",
      measurementId: "G-J16SZTRXJQ"
    }),
    RouterModule
    
    ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
