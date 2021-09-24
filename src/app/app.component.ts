import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RGtwo';
  constructor() {
    var firebaseConfig = {
      apiKey: 'AIzaSyCXrrrjiKfnHwh_XA2pyFUuuqnMgkelVCU',
      authDomain: 'rencontresgourmandespg.firebaseapp.com',
      databaseURL:
        'https://rencontresgourmandespg-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'rencontresgourmandespg',
      storageBucket: 'rencontresgourmandespg.appspot.com',
      messagingSenderId: '545293784515',
      appId: '1:545293784515:web:b4d8fcc2152029b44e1976',
      measurementId: 'G-ZHH9V0JH96',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
