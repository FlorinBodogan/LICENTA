import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator.service';
import { AuthService } from 'src/app/services/auth.service';
import { first, Observable, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/User';
import { ArterialTension } from 'src/app/models/ArterialTension';

@Component({
  selector: 'app-calculator-at',
  templateUrl: './calculator-at.component.html',
  styleUrls: ['./calculator-at.component.css']
})
export class CalculatorATComponent implements OnInit {
  userId: Pick<User, "id"> | undefined;
  calculus$: Observable<ArterialTension[]>;

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
      sbp: new FormControl("", [Validators.required, Validators.minLength(1)]),
      dbp: new FormControl("", [Validators.required, Validators.minLength(1)]),
    });
  }

  calculateAT(calculatorFormData: Pick<ArterialTension, "sbp" | "dbp">): void {
    const userId = this.authService.userId || this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    console.log('User ID:', userId);
  
    if (this.calculatorForm.valid) {
    this.calculatorService.collectDataAT(calculatorFormData, userId).pipe(
      first(),
      switchMap(() => this.fetchAT()),
      tap((results: ArterialTension[]) => {
        if (results.length > 0) {
          const currentResult = (results[0]);
          this.calculatorForm.patchValue({
            arterialtension: currentResult.result
          });
        }
      })
    ).subscribe(() => {
      this.calculus$ = this.fetchAT();
      this.create.emit(null);
    });
    this.calculatorForm.reset();
    this.formDirective.resetForm();
   }
  }
  
  collectDataAT(): void {
    this.calculus$ = this.fetchAT();
  }
  
  fetchAT(): Observable<ArterialTension[]> {
    return this.calculatorService.fetchAT();
  }

}
