import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/models/UserInfo';
import { CalculatorService } from 'src/app/services/calculator.service';
import { AuthService } from 'src/app/services/auth.service';
import { first, Observable, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { Rmb_result } from 'src/app/models/Rmb_result';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit{
  userId: Pick<User, "id"> | undefined;
  calculus$: Observable<Rmb_result[]>;

  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  calculatorForm: FormGroup;  

  constructor(private authService: AuthService, private calculatorService: CalculatorService){}

  ngOnInit(): void {
    this.calculatorForm = this.createFormGroup();
    this.userId = this.authService.getUserIdFromToken();
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      gender: new FormControl("", [Validators.required, Validators.minLength(3)]),
      age: new FormControl("", [Validators.required, Validators.minLength(1)]),
      height: new FormControl("", [Validators.required, Validators.minLength(3)]),
      weight: new FormControl("", [Validators.required, Validators.minLength(1)]),
      activitylevel: new FormControl("", [Validators.required, Validators.minLength(3)]),
    })
  }

  calculateRmb(calculatorFormData: Pick<UserInfo, "gender" | "age" | "height" | "weight" | "activitylevel">): void {
    
    const userId = this.authService.userId || this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    console.log('User ID:', userId);
  
    if (this.calculatorForm.valid) {
    this.calculatorService.collectDataRmb(calculatorFormData, userId).pipe(
      first(),
      switchMap(() => this.fetchRmb()),
      tap((results: Rmb_result[]) => {
        if (results.length > 0) {
          const currentResult = results[0];
          this.calculatorForm.patchValue({
            metabolicrate: currentResult.result
          });
        }
      })
    ).subscribe(() => {
      this.calculus$ = this.fetchRmb();
      this.create.emit(null);
    });
    this.calculatorForm.reset();
    this.formDirective.resetForm();
   }
  }
  
  fetchRmb(): Observable<Rmb_result[]> {
    return this.calculatorService.fetchRmb();
  }

  collectDataRmb(): void {
    this.calculus$ = this.fetchRmb();
  }

  deleteCalculus(rmbId: Pick<UserInfo, "id">): void {
    this.calculatorService.deleteCalculus(rmbId).subscribe(() => (this.calculus$ = this.fetchRmb()));
  }
}

