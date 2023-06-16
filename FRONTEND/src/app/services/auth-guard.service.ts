import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (!this.authService.isUserLogged$.value) {
      this.router.navigate(["home"]);
      return of(false);
    }
    const token = localStorage.getItem('token');

    const isBanned = this.authService.isBannedUser(token);

    if (isBanned) {
      this.router.navigate(["home"]);
      return of(false);
    }

    return this.authService.isUserLogged$;
  }

}
