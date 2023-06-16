import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url = "http://localhost:3500/user";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  fetchAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<User[]>("fetchUsers", [])));
  }

  collectDataUpdate(updateFormData: Pick<User, "name" | "email">, userName: string): Observable<User> {
    return this.http
    .post<User>(`${this.url}/updateAdmin`, {name: updateFormData.name, email: updateFormData.email, userName: userName}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<User>("UpdateUser"))
    );
  }

  banUser(userName: string): Observable<any> {
  const banUrl = `${this.url}/banAdmin`;
  const body = { userName: userName };
  return this.http.post<any>(banUrl, body);
}

unBanUser(userName: string): Observable<any> {
  const unBanUrl = `${this.url}/unBanAdmin`;
  const body = { userName: userName };
  return this.http.post<any>(unBanUrl, body);
}


  deleteUser(userName: string): Observable<any> {
    const deleteUrl = `${this.url}/deleteAdmin`;
    const body = { userName: userName };
    return this.http.delete<any>(deleteUrl, { body });
  }

}
