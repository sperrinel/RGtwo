import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exposant } from '../models/exposant';
import DataSnapshot = firebase.database.DataSnapshot;
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ExposantsService {
  exposantsSubject = new Subject<Exposant[]>();
  exposants: Exposant[] = [];
  constructor() {
    this.getExposantsFromServer();
  }

  //Ajouter un nouveau exposant
  addExposant(nouveauExposant: Exposant) {
    this.exposants.push(nouveauExposant);
    this.saveLivresToServer();
    this.emitExposantsSubject();
  }

  emitExposantsSubject() {
    this.exposantsSubject.next(this.exposants);
  }

  //Enregistre tous les exposants en BDD
  saveLivresToServer() {
    firebase.database().ref('/exposants').set(this.exposants);
  }

  //Récupère liste entière des exposants.
  getExposantsFromServer() {
    firebase
      .database()
      .ref('/exposants')
      .on('value', (data: DataSnapshot) => {
        this.exposants = data.val() ? data.val() : [];
        this.emitExposantsSubject();
      });
  }
}
