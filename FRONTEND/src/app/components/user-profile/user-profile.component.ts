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
  userBmiResult: Observable<Bmi_result[]>;
  userBmiDateResult: Observable<Bmi_result[]>;
  //userPhoto$: Observable<Images[]>;

  constructor(private userService: UserService, private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.userInfo$ = this.fetchUser();
    this.userId = this.userService.userId;

    this.userBmiResult = this.fetchAllBmi();
    this.userBmiDateResult = this.fetchBmiAllDate();
    
    this.displayChart();
    //this.userPhoto$ = this.fetchUserPhoto();
    //this.uploadForm = this.createFormGroup();
  }

   //chart
   displayChart() {
    const lineChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: [] as Array<string>, 
        datasets: [{
          label: 'Evolutia indicelui de masa corporala',
          data: [] as Array<number>,
          borderWidth: 3,
          borderColor: 'white',
          backgroundColor: ['blue', 'yellow', 'green', 'purple', 'orange'],
          pointRadius: 7
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

  //user statistics
  fetchAllBmi(): Observable<Bmi_result[]> {
    return this.calculatorService.fetchAllBmi();
  }
  fetchBmiAllDate(): Observable<Bmi_result[]> {
    return this.calculatorService.fetchBmiAllDate();
  }

}
