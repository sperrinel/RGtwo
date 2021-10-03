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
  imageParDefaut: string =
    'https://firebasestorage.googleapis.com/v0/b/rencontresgourmandespg.appspot.com/o/images%2Fimg-par-defaut.png?alt=media&token=e739253a-216a-45f5-b111-0bd65892d634';
  constructor() {
    this.getExposantsFromServer();
  }

  //Ajouter un nouveau exposant
  addExposant(nouveauExposant: Exposant) {
    this.exposants.push(nouveauExposant);
    this.saveExposantsToServer();
    this.emitExposantsSubject();
  }

  emitExposantsSubject() {
    this.exposantsSubject.next(this.exposants);
  }

  //Enregistre tous les exposants en BDD
  saveExposantsToServer() {
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

  updateExposant(idExposant: number, exposant: Exposant) {
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

  //Supprimer un exposant
  deleteExposantToServer(exposant: Exposant) {
    if (exposant.image != this.imageParDefaut && exposant.image != null) {
      const storageRef = firebase.storage().refFromURL(exposant.image);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé!');
        },
        (error) => {
          console.log('La suppression de la photo a échoué : ' + error);
        }
      );
    }
    const exposantIndexToRemove = this.exposants.findIndex((exposantEl) => {
      if (exposantEl === exposant) {
        return true;
      }
      return false;
    });
    this.exposants.splice(exposantIndexToRemove, 1);
    this.saveExposantsToServer();
    this.emitExposantsSubject();
  }
}
