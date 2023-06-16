import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token'); 
    if (!token) {
      this.router.navigate(['home']);
      return false;
    }

    const decodedToken: any = jwt_decode(token);
    const roles = decodedToken.role; 

    if (roles && roles.includes('admin')) {
      return true; 
    } else {
      this.router.navigate(['home']); 
      return false;
    }
  }
}
