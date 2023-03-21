import { Component, OnInit } from '@angular/core';
import { faBars, faXmark, faHouse, faRightFromBracket, faCalculator, faRightToBracket, faUserPlus, faCircleInfo, faChartSimple, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  faBars = faBars;
  faXmark = faXmark;
  faHouse = faHouse;
  faRightFromBracket = faRightFromBracket;
  faCalculator = faCalculator;
  faRightToBracket = faRightToBracket;
  faUserPlus = faUserPlus;
  faCircleInfo = faCircleInfo;
  faChartSimple = faChartSimple;
  faUser = faUser;
  
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.authService.isUserLogged$.subscribe((isLogged) => {
      this.isAuthenticated = isLogged;
    })
  }

  logout(): void{
    localStorage.removeItem("token");
    this.authService.isUserLogged$.next(false);
    this.router.navigate(["home"]);
  }
}
