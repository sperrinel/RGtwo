import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean| UrlTree| Observable<boolean | UrlTree>| Promise<boolean | UrlTree> {
      console.log(this.authService.isAuth);

    if (this.authService.isAuth == true) {
      return true;
    } else {
      this.router.navigate(['/auth']);
    }
    throw console.log('');
  }
}
