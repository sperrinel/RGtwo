import { Exposant } from 'src/app/models/exposant';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExposantsService } from 'src/app/services/exposants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  exposant: Exposant;
  copieExposant: Exposant;
  fileIsUploading = false;
  fileUrl: string = '';
  copieFileUrl: String = '';
  fileUploaded = false;
  idExposant: number;
  constructor(private exposantsService: ExposantsService) {}

  ngOnInit(): void {
    /* this.exposantsService.getSingleExposant(+id).then((exposant: Exposant) => {
      this.exposant = exposant;
      this.copieExposant = exposant;
      this.fileUrl = this.exposant.image;
      this.copieFileUrl = this.exposant.image;
      console.log(this.exposant);
    }); */
  }

  onSubmit(form: NgForm) {
    const id = this.exposant.id;
    const nom = form.value['nom'];
    const categorie = form.value['categorie'];
    const description = form.value['description'];
    const image = this.fileUrl;
    const telephone = form.value['telephone'];
    const portable = form.value['portable'];
    const email = form.value['email'];
    const siteweb = form.value['siteweb'];

    const exposant = new Exposant(
      id,
      nom,
      categorie,
      description,
      image,
      telephone,
      portable,
      email,
      siteweb
    );

    this.exposantsService.updateExposant(this.idExposant, exposant);
  }

  detectFiles(event: any) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.exposantsService.uploadFile(file).then((url: any) => {
      this.fileUrl = url;

      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  getExposantId(event: number) {
    console.log('Jreçoit un index égal à : ' + event);
    this.exposantsService
      .getSingleExposant(event)
      .then((exposant: Exposant) => {
        this.exposant = exposant;
        this.copieExposant = exposant;
        this.fileUrl = this.exposant.image;
        this.copieFileUrl = this.exposant.image;
        this.idExposant = event;
        console.log('idExposant est égal à : ' + this.idExposant);
      });
  }
}
