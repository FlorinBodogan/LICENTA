import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000;
    const now = Date.now();
    return now > expirationTime;
  }

  ngOnInit() {
    const checkLogged = localStorage.getItem("token");
    if(checkLogged !== null && !this.isTokenExpired(checkLogged)) {
      this.authService.isUserLogged$.next(true);

      const decodedToken: any = jwt_decode(checkLogged);
      const roles = decodedToken.role;
        if (roles && roles.includes('admin')) {
        this.authService.isAdmin$.next(true);
      } else {
        this.authService.isAdmin$.next(false);
      }
    } else if (checkLogged !== null && this.isTokenExpired(checkLogged)) {
      this.authService.isUserLogged$.next(false);
      this.router.navigate(["home"]);
    } else {
      this.authService.isUserLogged$.next(false);
    }
  }
  
}
