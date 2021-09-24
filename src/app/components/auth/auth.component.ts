import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  validationFormUser!: FormGroup;
  errorMessage: any;

  validationUserMessage = {
    email: [
      { type: 'required', message: 'Veuillez saisir votre Email' },
      { type: 'pattern', message: 'Cet Email est incorrect' },
    ],
    password: [
      { type: 'required', message: 'Veuillez saisir votre mot de passe' },
      {
        type: 'minlength',
        message: 'Le mot de passe doit contenir minimum 8 caractères',
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validationFormUser = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });
  }

  loginUser(value: { email: string; password: string }) {
    return new Promise<void>((resolve, reject) => {
      this.authService.loginFireauth(value).then(
        () => {
          this.router.navigate(['/home']);
          resolve();
        },
        (error) => {
          this.errorMessage = error.toString();
          console.log('console.log -----> ' + this.errorMessage);
          this.onGestionErreur();

          reject(error);
        }
      );
    });
  }

  onGestionErreur() {
    if (this.errorMessage.includes('network')) {
      return (this.errorMessage =
        'Une erreur liée à votre connexion internet est survenue.');
    } else {
      return (this.errorMessage =
        "Une erreur s'est produite, vérifier votre saisie.");
    }
  }
}
