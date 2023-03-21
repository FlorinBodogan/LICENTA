import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: Pick<User, "id">;
  userInfo$: Observable<User[]>

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userInfo$ = this.fetchUser();
    this.userId = this.userService.userId;
  }

  fetchUser(): Observable<User[]> {
    return this.userService.fetchUser();
  }
}
