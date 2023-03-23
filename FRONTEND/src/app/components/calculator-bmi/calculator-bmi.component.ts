import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/models/UserInfo';
import { CalculatorService } from 'src/app/services/calculator.service';
import { AuthService } from 'src/app/services/auth.service';
import { first, Observable, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { Bmi_result } from 'src/app/models/Bmi_result';

@Component({
  selector: 'app-calculator-bmi',
  templateUrl: './calculator-bmi.component.html',
  styleUrls: ['./calculator-bmi.component.css']
})
export class CalculatorBmiComponent implements OnInit {

  userId: Pick<User, "id"> | undefined;
  calculus$: Observable<Bmi_result[]>;

  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();
  calculatorForm: FormGroup;  

  constructor(private authService: AuthService, private calculatorService: CalculatorService){}

  ngOnInit(): void {
    this.calculatorForm = this.createFormGroup();
    this.userId = this.authService.getUserIdFromToken();
  }
  
  createFormGroup(): FormGroup {
    return new FormGroup({
      weight: new FormControl("", [Validators.required, Validators.minLength(1)]),
      height: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  calculateBmi(calculatorFormData: Pick<UserInfo, "weight" | "height">): void {
    
    const userId = this.authService.userId || this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    console.log('User ID:', userId);
  
    if (this.calculatorForm.valid) {
    this.calculatorService.collectDataBmi(calculatorFormData, userId).pipe(
      first(),
      switchMap(() => this.fetchBmi()),
      tap((results: Bmi_result[]) => {
        if (results.length > 0) {
          const currentResult = (results[0]);
          this.calculatorForm.patchValue({
            bodymassindex: currentResult.result
          });
        }
      })
    ).subscribe(() => {
      this.calculus$ = this.fetchBmi();
      this.create.emit(null);
    });
    this.calculatorForm.reset();
    this.formDirective.resetForm();
   }
  }
  
  fetchBmi(): Observable<Bmi_result[]> {
    return this.calculatorService.fetchBmi();
  }

  collectDataBmi(): void {
    this.calculus$ = this.fetchBmi();
  }

  deleteCalculus(bmiId: Pick<UserInfo, "id">): void {
    this.calculatorService.deleteCalculus(bmiId).subscribe(() => (this.calculus$ = this.fetchBmi()));
  }
}
