import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Images } from 'src/app/models/Images';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { faUpload, faICursor, faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'node_modules/chart.js';
import { UserInfo } from 'src/app/models/UserInfo';
import { ArterialTension } from 'src/app/models/ArterialTension';
import { Triglycerides } from 'src/app/models/Triglycerides';
import { Colesterol } from 'src/app/models/Colesterol';
Chart.register(...registerables); 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  faUpload = faUpload;
  faMousePointer = faMousePointer;
  uploadForm: FormGroup;

  userId: Pick<User, "id">;
  userInfo$: Observable<User[]>;
  userCol$: Observable<Colesterol[]>;
  userAT$: Observable<ArterialTension[]>;
  userTR$: Observable<Triglycerides[]>;

  selectedComponent: string = 'BMI';

  selectComponent(component: string) {
    this.selectedComponent = component;
  }


  //userPhoto$: Observable<Images[]>;

  constructor(private userService: UserService, private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.userInfo$ = this.fetchUser();
    this.userCol$ = this.fetchColByID();
    this.userAT$ = this.fetchATByID();
    this.userTR$ = this.fetchTRByID();
    this.userId = this.userService.userId;
  }
  
  createFormGroup(): FormGroup<any> {
    return new FormGroup({
      image: new FormControl("", [Validators.required, Validators.minLength(1)]),
    })
  }

  //user profile
  uploadPhoto(): void{
    this.userService.uploadPhoto(this.uploadForm.value, this.userId).subscribe((message => console.log(message)));
  }

  fetchUser(): Observable<User[]> {
    return this.userService.fetchUser();
  }

  fetchUserPhoto(): Observable<Images[]> {
    return this.userService.fetchUserPhoto();
  }

  //KG
  fetchAllAT(): Observable<ArterialTension[]> {
    return this.calculatorService.fetchAllAT();
  }
  fetchATAllDate(): Observable<ArterialTension[]> {
    return this.calculatorService.fetchATAllDate();
  }

  //cards info
  fetchColByID(): Observable<Colesterol[]> {
    return this.calculatorService.fetchCOLByID();
  }

  fetchATByID(): Observable<ArterialTension[]> {
    return this.calculatorService.fetchATByID();
  }

  fetchTRByID(): Observable<Triglycerides[]> {
    return this.calculatorService.fetchTRByID();
  }

}
