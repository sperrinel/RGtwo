import { Component, OnInit } from '@angular/core';
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
      this.authService.isAuth = this.isAuth;
      this.authService.emitIsAuthSubject();
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

  goToContact() {
    $('#goToContact').click(function () {
      $('html,body').animate(
        {
          scrollTop: $('footer').offset().top,
        },
        'fast'
      );
    });
    this.flashItem();
  }

  flashItem() {
    setTimeout(() => {
      $('.contactFlash')
        .fadeOut(400)
        .fadeIn(400)
        .fadeOut(400)
        .fadeIn(400)
        .fadeOut(400)
        .fadeIn(400)
        .fadeOut(400)
        .fadeIn(400);
    }, 2000);
  }
}
