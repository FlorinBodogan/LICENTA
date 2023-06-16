import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loginFailed: boolean = false;
  submitted: boolean = false;

  constructor(private authService: AuthService, private errorHandlerService: ErrorHandlerService){}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  login() : void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.login({ name: this.loginForm.value.name, password: this.loginForm.value.password }).subscribe((message => console.log(message)));
    } else {
    Object.keys(this.loginForm.controls).forEach(controlName => {
      const control = this.loginForm.controls[controlName];
      control.markAsTouched();
    });
  }
  }
}
