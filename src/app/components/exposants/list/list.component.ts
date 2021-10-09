import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Exposant } from 'src/app/models/exposant';
import { AuthService } from 'src/app/services/auth.service';
import { ExposantsService } from 'src/app/services/exposants.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isAuthSubscription: Subscription;
  exposantsSubscription: Subscription;
  exposants!: Exposant[];
  @Output() idExposantEdit: EventEmitter<any> = new EventEmitter();

  constructor(
    private exposantsService: ExposantsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth: any) => {
        this.isAuth = isAuth;
      },
      (error: any) => {
        console.log('Erreur : ' + error);
      },
      () => {
        console.log('Observable complété');
      }
    );
    this.authService.emitIsAuthSubject();

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

  ngOnDestroy(): void {
    this.isAuthSubscription.unsubscribe();
  }

  //Récupère l'id de l'exposant grâce au btn activation de la modal de l'HTML et le donne à la modal via un eventEmitter
  sendNotification(index) {
    this.idExposantEdit.emit(index);
  }

  //supprime exposant
  onDeleteExposantToServer(exposant: Exposant) {
    this.exposantsService.deleteExposantToServer(exposant);
  }
}
