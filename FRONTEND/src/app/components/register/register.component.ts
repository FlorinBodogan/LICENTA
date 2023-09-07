import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerSucceded: boolean = false;
  submitted: boolean = false;
  response: any = "";

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.registerForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup(
      {
        name: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl("", Validators.required)
      },
      { validators: this.passwordConfirmationValidator.bind(this) }
    );
  } 

  passwordConfirmationValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordWrong: true });
      return { passwordWrong: true };
    }

    return null;
  }

  register(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.registerSucceded = true;
      this.authService.register(this.registerForm.value).subscribe((response: any) => {
      this.response = response.message;
    });
    } else {
      Object.keys(this.registerForm.controls).forEach(controlName => {
        const control = this.registerForm.controls[controlName];
        control.markAsTouched();
      });
    }
  }

}
