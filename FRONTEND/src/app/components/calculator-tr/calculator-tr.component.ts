import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator.service';
import { AuthService } from 'src/app/services/auth.service';
import { first, Observable, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { Triglycerides } from 'src/app/models/Triglycerides';

@Component({
  selector: 'app-calculator-tr',
  templateUrl: './calculator-tr.component.html',
  styleUrls: ['./calculator-tr.component.css']
})
export class CalculatorTRComponent implements OnInit {
  userId: Pick<User, "id"> | undefined;
  calculus$: Observable<Triglycerides[]>;

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
      colesterol: new FormControl("", [Validators.required, Validators.minLength(1)]),
      hdl: new FormControl("", [Validators.required, Validators.minLength(1)]),
      ldl: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  calculateTR(calculatorFormData: Pick<Triglycerides, "colesterol" | "hdl" | "ldl">): void {
    const userId = this.authService.userId || this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    console.log('User ID:', userId);
  
    if (this.calculatorForm.valid) {
    this.calculatorService.collectDataTR(calculatorFormData, userId).pipe(
      first(),
      switchMap(() => this.fetchTR()),
      tap((results: Triglycerides[]) => {
        if (results.length > 0) {
          const currentResult = (results[0]);
          this.calculatorForm.patchValue({
            triglycerides: currentResult.result
          });
        }
      })
    ).subscribe(() => {
      this.calculus$ = this.fetchTR();
      this.create.emit(null);
    });
    this.calculatorForm.reset();
    this.formDirective.resetForm();
   }
  }
  
  collectDataTR(): void {
    this.calculus$ = this.fetchTR();
  }
  
  fetchTR(): Observable<Triglycerides[]> {
    return this.calculatorService.fetchTR();
  }
}
