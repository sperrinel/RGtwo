import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  //Connexion
  async loginFireauth(value: { email: string; password: string }) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }

  //Déconnexion
  logout() {
    firebase.auth().signOut();
    localStorage.removeItem('user');
  }
}
