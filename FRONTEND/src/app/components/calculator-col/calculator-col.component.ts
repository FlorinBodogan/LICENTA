import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator.service';
import { AuthService } from 'src/app/services/auth.service';
import { first, Observable, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { Colesterol } from 'src/app/models/Colesterol';

@Component({
  selector: 'app-calculator-col',
  templateUrl: './calculator-col.component.html',
  styleUrls: ['./calculator-col.component.css']
})
export class CalculatorCOLComponent implements OnInit {
  userId: Pick<User, "id"> | undefined;
  calculus$: Observable<Colesterol[]>;

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
      hdl: new FormControl("", [Validators.required, Validators.minLength(1)]),
      ldl: new FormControl("", [Validators.required, Validators.minLength(1)]),
      triglycerides: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  calculateCOL(calculatorFormData: Pick<Colesterol, "hdl" | "ldl" | "triglycerides" >): void {
    const userId = this.authService.userId || this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    console.log('User ID:', userId);
  
    if (this.calculatorForm.valid) {
    this.calculatorService.collectDataCOL(calculatorFormData, userId).pipe(
      first(),
      switchMap(() => this.fetchCOL()),
      tap((results: Colesterol[]) => {
        if (results.length > 0) {
          const currentResult = (results[0]);
          this.calculatorForm.patchValue({
            arterialtension: currentResult.result
          });
        }
      })
    ).subscribe(() => {
      this.calculus$ = this.fetchCOL();
      this.create.emit(null);
    });
    this.calculatorForm.reset();
    this.formDirective.resetForm();
   }
  }

  collectDataCOL(): void {
    this.calculus$ = this.fetchCOL();
  }
  
  fetchCOL(): Observable<Colesterol[]> {
    return this.calculatorService.fetchCOL();
  }
}
