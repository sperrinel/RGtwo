import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  activeClass() {
    $('#mainMenu li a').on('click', function () {
      $('#mainMenu li a.active').removeClass('active');
      $(this).addClass('active');
    });
  }
}
