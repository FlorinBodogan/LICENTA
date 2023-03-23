import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Images } from 'src/app/models/Images';
import { Bmi_result } from 'src/app/models/Bmi_result';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'node_modules/chart.js';
import { Rmb_result } from 'src/app/models/Rmb_result';
import { UserInfo } from 'src/app/models/UserInfo';
import { ArterialTension } from 'src/app/models/ArterialTension';
import { Tryglicerides } from 'src/app/models/Tryglicerides';
Chart.register(...registerables); 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  faUpload = faUpload;

  uploadForm: FormGroup;

  userId: Pick<User, "id">;
  userInfo$: Observable<User[]>;
  userWeight$: Observable<UserInfo[]>;
  userAT$: Observable<ArterialTension[]>;
  userTR$: Observable<Tryglicerides[]>;
  
  userBmiResult: Observable<Bmi_result[]>;
  userBmiDateResult: Observable<Bmi_result[]>;

  userRmbResult: Observable<Rmb_result[]>;
  userRmbDateResult: Observable<Rmb_result[]>;
  //userPhoto$: Observable<Images[]>;

  constructor(private userService: UserService, private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.userInfo$ = this.fetchUser();
    this.userWeight$ = this.fetchWeightByID();
    this.userAT$ = this.fetchATByID();
    this.userTR$ = this.fetchTRByID();
    this.userId = this.userService.userId;

    this.userBmiResult = this.fetchAllBmi();
    this.userBmiDateResult = this.fetchBmiAllDate();

    this.userRmbResult = this.fetchAllRmb();
    this.userRmbDateResult = this.fetchRmbAllDate();
    
    this.displayChartBMI();
    this.displayChartRMB();
    //this.userPhoto$ = this.fetchUserPhoto();
    //this.uploadForm = this.createFormGroup();

  }

   //INDICE MASA CORPORALA
   displayChartBMI() {
    const lineChart = new Chart('chartBMI', {
      type: 'bar',
      data: {
        labels: [] as Array<string>, 
        datasets: [{
          label: 'Indice Masa Corporala',
          data: [] as Array<number>,
          borderWidth: 3,
          borderColor: 'white',
          backgroundColor: ['#2cd929'],
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white',
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white' 
            }
          },
          title: {
            display: true,
            text: 'BMI',
            color: 'white' 
          }
        }
      }
    });

    this.userBmiResult.subscribe((data) => {
      const bmiData = data.map((d) => d.result);
      lineChart.data.datasets[0].data = bmiData;
      lineChart.update();
    });
  
    this.userBmiDateResult.subscribe((data) => {
      const bmiDate = data.map((d) => new Date(d.date).toLocaleDateString());
      lineChart.data.labels = bmiDate;
      lineChart.update();
    });
  }

   //RATA METABOLICA BAZALA
   displayChartRMB() {
    const lineChart = new Chart('chartRMB', {
      type: 'line',
      data: {
        labels: [] as Array<string>, 
        datasets: [{
          label: 'Rata Metabolica Bazala',
          data: [] as Array<number>,
          borderWidth: 4,
          borderColor: 'blue',
          backgroundColor: ['blue'],
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'black'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'black',
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black' 
            }
          },
          title: {
            display: true,
            text: 'RMB',
            color: 'black' 
          }
        }
      }
    });

    this.userRmbResult.subscribe((data) => {
      const rmbData = data.map((d) => d.result);
      lineChart.data.datasets[0].data = rmbData;
      lineChart.update();
    });
  
    this.userRmbDateResult.subscribe((data) => {
      const rmbDate = data.map((d) => new Date(d.date).toLocaleDateString());
      lineChart.data.labels = rmbDate;
      lineChart.update();
    });
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

  //BMI
  fetchAllBmi(): Observable<Bmi_result[]> {
    return this.calculatorService.fetchAllBmi();
  }
  fetchBmiAllDate(): Observable<Bmi_result[]> {
    return this.calculatorService.fetchBmiAllDate();
  }


  //RMB
  fetchAllRmb(): Observable<Rmb_result[]> {
    return this.calculatorService.fetchAllRmb();
  }
  fetchRmbAllDate(): Observable<Rmb_result[]> {
    return this.calculatorService.fetchRmbAllDate();
  }

  //cards info
  fetchWeightByID(): Observable<UserInfo[]> {
    return this.calculatorService.fetchWeightByID();
  }

  fetchATByID(): Observable<ArterialTension[]> {
    return this.calculatorService.fetchATByID();
  }

  fetchTRByID(): Observable<Tryglicerides[]> {
    return this.calculatorService.fetchTRByID();
  }

}
