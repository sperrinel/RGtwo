import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  fileIsUploading = false;
  fileUrl: string =
    'https://firebasestorage.googleapis.com/v0/b/bibliotheque-7677f.appspot.com/o/images%2Fdefaut.png?alt=media&token=96ad9f97-d524-4092-933a-9693876cca70';
  fileUploaded = false;

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    /* console.log('je suis dans onSubmit')
    const id = this.livres.length;
    const nom = form.value["name"];
    const auteur = form.value["author"];
    const description = form.value["description"];
    const image = this.fileUrl

    const nouveauLivre = new Livre(id, nom, auteur, description, image);

    this.livresService.addLivre(nouveauLivre);
    this.onSave()
    this.onClose()*/
  }

  onUploadFile(file: File) {
    /*
    this.fileIsUploading = true;
    this.livresService.uploadFile(file).then(
      (url: any) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    ); */
  }

  detectFiles(event: any) {
    this.onUploadFile(event.target.files[0]);
  }
}
