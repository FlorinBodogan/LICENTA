import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3500/auth";

  isUserLogged$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);
  loginFailed$ = new BehaviorSubject<boolean>(false);
  isUserBanned = new BehaviorSubject<boolean>(false);
  loginFailedDueToBannedUser = new BehaviorSubject<boolean>(false);

  userId: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient,
     private errorHandlerService: ErrorHandlerService,
     private router: Router
  ) { }

  checkIfAdmin() {
    const checkLogged = localStorage.getItem("token");

    if (checkLogged !== null) {
      const decodedToken: any = jwt_decode(checkLogged);
      const roles = decodedToken.role;

      if (roles && roles.includes('admin')) {
        this.isAdmin$.next(true);
      } else {
        this.isAdmin$.next(false);
      }
    } else {
      this.isAdmin$.next(false);
    }
  }

  register(user: Omit<User, "id">): Observable<User>{
    return this.http.post<User>(`${this.url}/register`, user, this.httpOptions).pipe(
      first(), 
      catchError(this.errorHandlerService.handleError<User>("register"))
    );
  }

  login({ name, password }: { name: Pick<User, "name">; password: Pick<User, "password">; }): Observable<{ token: string; userId: Pick<User, "id">; user: User; }> {
  return this.http
    .post(`${this.url}/login`, { name, password }, this.httpOptions)
    .pipe(
      first(Object),
      tap((response) => {
        const isBanned = this.isBannedUser(response);

        if (isBanned) {
          this.loginFailedDueToBannedUser.next(true);
          throw new Error('User is banned');
        }

        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", JSON.stringify(response.userId));
        localStorage.setItem("user", JSON.stringify(response.user));
        this.isUserLogged$.next(true);
        this.loginFailedDueToBannedUser.next(false);
        this.router.navigate(["home"]);
        this.checkIfAdmin();
      }),
      catchError(
        this.errorHandlerService.handleError<{
          token: string;
          userId: Pick<User, "id">;
          user: User;
        }>("login")
      )
    );
}


  
  isBannedUser(response: { token: string }): boolean {
  if (!response.token) {
    this.isUserBanned.next(false);
    return false;
  }

  try {
    const decodedToken: any = jwt_decode(response.token);
    const userStatus = decodedToken.status;

    if (userStatus === 'banat') {
      this.isUserBanned.next(true);
      return true;
    } else {
      this.isUserBanned.next(false);
      return false;
    }
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      this.isUserBanned.next(false);
      return false;
    }
  }

  getUserIdFromToken(): Pick<User, "id"> | undefined {
    const token = localStorage.getItem("token");
    if (!token) {
      return undefined;
    }

    const decodedToken = jwt_decode(token) as { userId: Pick<User, "id"> };
    const userId = JSON.parse(localStorage.getItem("userId") || "{}");

    return userId || decodedToken.userId;
  }
}

