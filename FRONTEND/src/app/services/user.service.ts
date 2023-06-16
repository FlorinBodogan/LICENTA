import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { Images } from '../models/Images';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { Colesterol } from '../models/Colesterol';
import { ArterialTension } from '../models/ArterialTension';
import { Triglycerides } from '../models/Triglycerides';
import { Rmb_result } from '../models/Rmb_result';
import { Bmi_result } from '../models/Bmi_result';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3500";
  private url2 = "http://localhost:3500/userhistory";

  userId: Pick<User, "id">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data" }),
  };

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //----------------------------------------------- USER HISTORY ------------------------------------------------------------------------

  fetchAllRmb(): Observable<Rmb_result[]>{
    return this.http.get<Rmb_result[]>(`${this.url2}/rmb/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Rmb_result[]>("fetchRmb", [])));
  }
  
  fetchAllBmi(): Observable<Bmi_result[]>{
    return this.http.get<Bmi_result[]>(`${this.url2}/bmi/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Bmi_result[]>("fetchBmi", [])));
  }
  fetchAllCOLWithParams(): Observable<Colesterol[]>{
    return this.http.get<Colesterol[]>(`${this.url2}/col/allWithParams`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Colesterol[]>("fetchCOL", [])));
  }

  fetchAllTRWithParams(): Observable<Triglycerides[]>{
    return this.http.get<Triglycerides[]>(`${this.url2}/tr/allWithParams`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Triglycerides[]>("fetchTR", [])));
  }

  fetchAllATWithParams(): Observable<ArterialTension[]>{
    return this.http.get<ArterialTension[]>(`${this.url2}/at/allWithParams`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<ArterialTension[]>("fetchAT", [])));
  }

  //------------------------------------------------------------------------------------------------------------------------------------
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //curent user info
  fetchUser(): Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/user`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<User[]>("fetchUser", [])));
  }

  //edit user info
  

  //curent user photo
  fetchUserPhoto(): Observable<Images[]>{
    return this.http.get<Images[]>(`${this.url}/images`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Images[]>("fetchUserPhoto", [])));
  }

  uploadPhoto(uploadFormData: Partial<Images>, userId: Pick<User, "id"> ): Observable<Images>{
    return this.http
    .post<Images>(`${this.url}/images`, {image: uploadFormData.image, user: userId}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Images>("uploadPhoto"))
    );
  }
}
