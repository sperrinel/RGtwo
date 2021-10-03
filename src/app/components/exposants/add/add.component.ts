import { ExposantsService } from 'src/app/services/exposants.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exposant } from 'src/app/models/exposant';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  //1) RECUP DONNES FORM
  //2) PASSER CES DONNEES AUX ATTRIBUTS DE L OBJET EXPOSANT
  //3) PASSER L OBJET DANS LE TABLEAU DES EXPOSANTS AVEC UN PUSH
  //4) ENREGISTRER EN BDD ET EMIT POUR AVERTIR DU CHANGEMENT

  exposantsSubscription: Subscription;
  exposants: Exposant[];
  fileIsUploading = false;
  fileUrl: string =
    'https://firebasestorage.googleapis.com/v0/b/rencontresgourmandespg.appspot.com/o/images%2Fimg-par-defaut.png?alt=media&token=e739253a-216a-45f5-b111-0bd65892d634';
  fileUploaded = false;

  constructor(
    private exposantsService: ExposantsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exposantsSubscription =
      this.exposantsService.exposantsSubject.subscribe(
        (exposants: Exposant[]) => (this.exposants = exposants)
      );
    this.exposantsService.emitExposantsSubject();
  }

  onSubmit(form: NgForm) {
    const id = this.exposants.length;
    const nom = form.value['nom'];
    const description = form.value['description'];
    const image = this.fileUrl;

    const nouveauExposant = new Exposant(id, nom, description, image);

    this.exposantsService.addExposant(nouveauExposant);
    console.log(this.exposantsService.exposants);

    this.router.navigate(['/home']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.exposantsService.uploadFile(file).then((url: any) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  detectFiles(event: any) {
    this.onUploadFile(event.target.files[0]);
  }
}
