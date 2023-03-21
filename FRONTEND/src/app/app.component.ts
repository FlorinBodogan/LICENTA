import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FRONTEND';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const checkLogged = localStorage.getItem("token");
    if(checkLogged !== null){
      this.authService.isUserLogged$.next(true);
    } else {
      this.authService.isUserLogged$.next(false);
    }
  }
}
