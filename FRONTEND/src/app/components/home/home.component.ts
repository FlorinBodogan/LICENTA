import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    userId: Pick<User, "id">;
    userInfo$: Observable<User[]>;

    isAuthenticated = true;

    constructor(private authService: AuthService, private userService: UserService) {}

    ngOnInit(): void {
      this.authService.isUserLogged$.subscribe((isLogged) => {
        this.isAuthenticated = isLogged;
      })
      this.userInfo$ = this.fetchUser();
      this.userId = this.userService.userId;
    }

    fetchUser(): Observable<User[]> {
      return this.userService.fetchUser();
    }
}
