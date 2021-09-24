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

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }

  //Récupère un seul exposant
  getSingleExposant(id: number) {
    return new Promise<Exposant>((resolve, reject) => {
      firebase
        .database()
        .ref('/exposants/' + id)
        .once('value')
        .then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  updateLivre(idExposant: number, exposant: Exposant) {
    firebase
      .database()
      .ref('exposants/' + idExposant)
      .set({
        id: exposant.id,
        nom: exposant.nom,
        description: exposant.description,
        image: exposant.image,
      });
  }
}
