import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { UserInfo} from '../models/UserInfo'; 
import { Rmb_result } from '../models/Rmb_result'; 
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { first, catchError } from 'rxjs/operators';
import { Bmi_result } from '../models/Bmi_result';
import { ArterialTension } from '../models/ArterialTension';
import { Tryglicerides } from '../models/Tryglicerides';
import { Colesterol } from '../models/Colesterol';
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private url = "http://localhost:3500/userinfo";
  private url2 = "http://localhost:3500/arterialtension";
  private url3 = "http://localhost:3500/tryglicerides";
  private url4 = "http://localhost:3500/colesterol";

  

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  //--------------------------------------------------------RMB BMI-------------------------------------------------------------

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

  fetchBmiAllCategories(): Observable<Bmi_result[]>{
    return this.http.get<Bmi_result[]>(`${this.url}/bmi/category`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Bmi_result[]>("fetchCategories", [])));
  }

  fetchAllActivity(): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}/rmb/activity`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<UserInfo[]>("fetchActivity", [])));
  }

  fetchWeightByID(): Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(`${this.url}/rmb/weight`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<UserInfo[]>("fetchActivity", [])));
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

  getCountForBmiCategory(category: string): Observable<number> {
    return this.http.get<number>(`${this.url}/bmi/categoryCount/${category}`);
  }

  getCountForActivity(activitylevel: string): Observable<number> {
    return this.http.get<number>(`${this.url}/rmb/activityCount/${activitylevel}`);
  }


  //------------------------------------------------------------ARTERIAL TENSION-------------------------------------------

  fetchAT(): Observable<ArterialTension[]>{
    return this.http.get<ArterialTension[]>(`${this.url2}/at`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<ArterialTension[]>("fetchAT", [])));
  }

  fetchATByID(): Observable<ArterialTension[]>{
    return this.http.get<ArterialTension[]>(`${this.url2}/at/resultbyID`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<ArterialTension[]>("fetchAT", [])));
  }

  fetchAllAT(): Observable<ArterialTension[]>{
    return this.http.get<ArterialTension[]>(`${this.url2}/at/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<ArterialTension[]>("fetchAT", [])));
  }

  fetchATAllDate(): Observable<ArterialTension[]>{
    return this.http.get<ArterialTension[]>(`${this.url2}/at/date`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<ArterialTension[]>("fetchATDate", [])));
  }

  collectDataAT(calculatorFormData: Partial<ArterialTension>, userId: Pick<User, "id">): Observable<ArterialTension> {
    return this.http
    .post<ArterialTension>(`${this.url2}/at`, {sbp: calculatorFormData.sbp, dbp: calculatorFormData.dbp, user: userId}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<ArterialTension>("collectDataAT"))
    );
  }

  fetchATAllCategories(): Observable<ArterialTension[]>{
    return this.http.get<ArterialTension[]>(`${this.url2}/at/result`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<ArterialTension[]>("fetchCategories", [])));
  }

  getCountForATCategory(category: string): Observable<number> {
    return this.http.get<number>(`${this.url2}/at/resultCount/${category}`);
  }


  //---------------------------------------------TRYGLICERIDES-------------------------------------------------------------

  fetchTR(): Observable<Tryglicerides[]>{
    return this.http.get<Tryglicerides[]>(`${this.url3}/tr`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Tryglicerides[]>("fetchTR", [])));
  }

  fetchTRByID(): Observable<Tryglicerides[]>{
    return this.http.get<Tryglicerides[]>(`${this.url3}/tr/resultbyID`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Tryglicerides[]>("fetchTR", [])));
  }

  fetchAllTR(): Observable<Tryglicerides[]>{
    return this.http.get<Tryglicerides[]>(`${this.url3}/tr/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Tryglicerides[]>("fetchTR", [])));
  }

  fetchTRAllDate(): Observable<Tryglicerides[]>{
    return this.http.get<Tryglicerides[]>(`${this.url3}/tr/date`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Tryglicerides[]>("fetchTRDate", [])));
  }

  collectDataTR(calculatorFormData: Partial<Tryglicerides>, userId: Pick<User, "id">): Observable<Tryglicerides> {
    return this.http
    .post<Tryglicerides>(`${this.url3}/tr`, {colesterol: calculatorFormData.colesterol, hdl: calculatorFormData.hdl, ldl: calculatorFormData.ldl, user: userId}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Tryglicerides>("collectDataTR"))
    );
  }

  fetchTRAllCategories(): Observable<Tryglicerides[]>{
    return this.http.get<Tryglicerides[]>(`${this.url3}/tr/result`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Tryglicerides[]>("fetchCategories", [])));
  }

  getCountForTRCategory(category: string): Observable<number> {
    return this.http.get<number>(`${this.url3}/tr/resultCount/${category}`);
  }


  //---------------------------------------------COLESTEROL-------------------------------------------------------------

  fetchCOL(): Observable<Colesterol[]>{
    return this.http.get<Colesterol[]>(`${this.url4}/col`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Colesterol[]>("fetchCOL", [])));
  }

  fetchCOLByID(): Observable<Colesterol[]>{
    return this.http.get<Colesterol[]>(`${this.url4}/col/resultbyID`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Colesterol[]>("fetchCOL", [])));
  }

  fetchAllCOL(): Observable<Colesterol[]>{
    return this.http.get<Colesterol[]>(`${this.url4}/col/all`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Colesterol[]>("fetchCOL", [])));
  }

  fetchCOLAllDate(): Observable<Colesterol[]>{
    return this.http.get<Colesterol[]>(`${this.url4}/col/date`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Colesterol[]>("fetchCOLDate", [])));
  }

  collectDataCOL(calculatorFormData: Partial<Colesterol>, userId: Pick<User, "id">): Observable<Colesterol> {
    return this.http
    .post<Colesterol>(`${this.url4}/col`, {hdl: calculatorFormData.hdl, ldl: calculatorFormData.ldl, triglycerides: calculatorFormData.triglycerides, user: userId}, this.httpOptions)
    .pipe(
      catchError(this.errorHandlerService.handleError<Colesterol>("collectDataCOL"))
    );
  }

  fetchCOLAllCategories(): Observable<Colesterol[]>{
    return this.http.get<Colesterol[]>(`${this.url4}/col/result`, {responseType: "json"}).pipe(catchError(this.errorHandlerService.handleError<Colesterol[]>("fetchCategories", [])));
  }

  getCountForCOLCategory(category: string): Observable<number> {
    return this.http.get<number>(`${this.url4}/col/resultCount/${category}`);
  }

}
