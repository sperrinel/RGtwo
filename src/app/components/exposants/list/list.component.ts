import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exposant } from 'src/app/models/exposant';
import { ExposantsService } from 'src/app/services/exposants.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  exposantsSubscription: Subscription;
  exposants!: Exposant[];
  constructor(private exposantsService: ExposantsService) {}

  ngOnInit(): void {
    this.exposantsSubscription =
      this.exposantsService.exposantsSubject.subscribe(
        (exposants: Exposant[]) => {
          this.exposants = exposants;
        },
        (error: any) => {
          console.log('Erreur : ' + error);
        },
        () => {
          console.log('Observable complété');
        }
      );
    this.exposantsService.emitExposantsSubject();
  }
}
