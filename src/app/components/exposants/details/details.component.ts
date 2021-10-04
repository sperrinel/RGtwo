import { Exposant } from 'src/app/models/exposant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExposantsService } from 'src/app/services/exposants.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  exposant: Exposant = {
    id: '',
    nom: '',
    description: '',
    image: '',
  };

  fileIsUploading = false;
  fileUrl: string = '';
  fileUploaded = false;

  constructor(
    private Activateroute: ActivatedRoute,
    private exposantsService: ExposantsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const index = this.Activateroute.snapshot.params['index'];
    this.exposantsService
      .getSingleExposant(index)
      .then((exposant: Exposant) => {
        this.exposant = exposant;
        this.fileUrl = this.exposant.image;
      });
  }

  onBack() {
    this.router.navigate(['/home']);
  }
}
