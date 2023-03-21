import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { UserInfo} from '../models/UserInfo'; 
import { Rmb_result } from '../models/Rmb_result'; 
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';
import { Bmi_result } from '../models/Bmi_result';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private url = "http://localhost:3500/userinfo";

  

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  fetchRmb(): Observable<Rmb_result[]>{
    return this.http.get<Rmb_result[]>(`${this.url}/rmb`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Rmb_result[]>("fetchRmb", [])));
  }

  fetchAllRmb(): Observable<Rmb_result[]>{
    return this.http.get<Rmb_result[]>(`${this.url}/rmb/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Rmb_result[]>("fetchRmb", [])));
  }

  fetchRmbAllDate(): Observable<Rmb_result[]>{
    return this.http.get<Rmb_result[]>(`${this.url}/rmb/date`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Rmb_result[]>("fetchRmbDate", [])));
  }

  fetchBmi(): Observable<Bmi_result[]>{
    return this.http.get<Bmi_result[]>(`${this.url}/bmi`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Bmi_result[]>("fetchBmi", [])));
  }

  fetchAllBmi(): Observable<Bmi_result[]>{
    return this.http.get<Bmi_result[]>(`${this.url}/bmi/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Bmi_result[]>("fetchBmi", [])));
  }

  fetchBmiAllDate(): Observable<Bmi_result[]>{
    return this.http.get<Bmi_result[]>(`${this.url}/bmi/date`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Bmi_result[]>("fetchBmiDate", [])));
  }

  collectDataRmb(calculatorFormData: Partial<UserInfo>, userId: Pick<User, "id">): Observable<UserInfo> {
    return this.http
    .post<UserInfo>(`${this.url}/rmb`, {gender: calculatorFormData.gender, age: calculatorFormData.age, height: calculatorFormData.height, weight: calculatorFormData.weight, activitylevel: calculatorFormData.activitylevel, user: userId}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<UserInfo>("collectDataRmb"))
    );
  }

  collectDataBmi(calculatorFormData: Partial<UserInfo>, userId: Pick<User, "id">): Observable<UserInfo> {
    return this.http
    .post<UserInfo>(`${this.url}/bmi`, {weight: calculatorFormData.weight, height: calculatorFormData.height, user: userId}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<UserInfo>("collectDataBmi"))
    );
  }
  
  deleteCalculus(rmbId: Pick<UserInfo, "id">): Observable<{}> {
    return this.http.delete<UserInfo>(`${this.url}/${rmbId}`, this.httpOptions)
    .pipe(
      first(),
      catchError(this.errorHandlerService.handleError<UserInfo>("deleteCalculus"))
    )
  }
}
