import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthSubscription: Subscription;
  isAuth: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth: any) => {
        this.isAuth = isAuth;
      }
    );
    this.authService.emitIsAuthSubject();
    console.log('dis moi true please' + this.authService.isAuth);
  }

  logout() {
    this.authService.logout();
  }
}
