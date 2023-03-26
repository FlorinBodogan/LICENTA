import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  userId: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient,
     private errorHandlerService: ErrorHandlerService,
     private router: Router
  ) { }

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
          console.log('Response:', response);
          localStorage.setItem("token", response.token);
          localStorage.setItem("userId", JSON.stringify(response.userId));
          localStorage.setItem("user", JSON.stringify(response.user));
          this.isUserLogged$.next(true);
          this.router.navigate(["home"]);
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
  

getUserIdFromToken(): Pick<User, "id"> | undefined {
  const token = localStorage.getItem("token");
  if (!token) {
    return undefined;
  }

  const decodedToken = jwt_decode(token) as { userId: Pick<User, "id"> };
  
  // Retrieve the user id from local storage
  const userId = JSON.parse(localStorage.getItem("userId") || "{}");

  return userId || decodedToken.userId;
}
}

