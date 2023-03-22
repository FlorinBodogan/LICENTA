import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { UserInfo} from 'src/app/models/UserInfo'; 
import { forkJoin, Observable } from 'rxjs';
import { Bmi_result } from 'src/app/models/Bmi_result';
import { CalculatorService } from 'src/app/services/calculator.service';
Chart.register(...registerables); 

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

constructor(private calculatorService:CalculatorService) {}

userBmiCategory: Observable<Bmi_result[]>;
userActivity: Observable<UserInfo[]>;

bmiChart: any;
activityChart: any;

updateChartDataBmi(data: number[]) {
  this.bmiChart.data.datasets[0].data = data;
  this.bmiChart.update();
}

updateChartDataActivity(data: number[]) {
  this.activityChart.data.datasets[0].data = data;
  this.activityChart.update();
}

ngOnInit(): void {
  this.userBmiCategory = this.fetchBmiAllCategories();
  this.userActivity = this.fetchAllActivity();
  
  this.displayChartBmi();
  this.displayChartActivity();

  this.userBmiCategory.subscribe((data: Bmi_result[]) => {
    const counts = [
      data.filter((item) => item.category === 'Subponderal').length,
      data.filter((item) => item.category === 'Normal').length,
      data.filter((item) => item.category === 'Supraponderal').length,
      data.filter((item) => item.category === 'Obez').length,
    ];
    this.updateChartDataBmi(counts);
  });

  this.userActivity.subscribe((data: UserInfo[]) => {
    console.log('userBmiCategory data received', data);
    const counts = [
      data.filter((item) => item.activitylevel === 'sedentar').length,
      data.filter((item) => item.activitylevel === 'scazut').length,
      data.filter((item) => item.activitylevel === 'moderat').length,
      data.filter((item) => item.activitylevel === 'ridicat').length,
      data.filter((item) => item.activitylevel === 'foarteridicat').length,
    ];
    this.updateChartDataActivity(counts);
  });
}

displayChartBmi() {
  this.bmiChart = new Chart('bmiChart', {
    type: 'pie',
    data: {
      labels: ["Subponderal", "Normal", "Supraponderal", "Obez"], 
      datasets: [{
        label: 'Categorii',
        data: [] as Array<number>,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: ['blue', 'green', 'yellow', 'red'], 
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
          text: 'BMI',
          color: 'black' 
        }
      }
    }
  });

  const countObservables = [];
  countObservables.push(this.calculatorService.getCountForBmiCategory('Subponderal'));
  countObservables.push(this.calculatorService.getCountForBmiCategory('Normal'));
  countObservables.push(this.calculatorService.getCountForBmiCategory('Supraponderal'));
  countObservables.push(this.calculatorService.getCountForBmiCategory('Obez'));

  forkJoin(countObservables).subscribe(counts => {
    this.updateChartDataBmi(counts);
  });
}

displayChartActivity() {
  this.activityChart = new Chart('activityChart', {
    type: 'pie',
    data: {
      labels: ["Sedentar", "Scazut", "Moderat", "Ridicat", "Foarte Ridicat"], 
      datasets: [{
        label: 'Nivelul de activitate la nivelul tututor utilizatorilor',
        data: [] as Array<number>,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: ['blue', 'yellow', 'green', 'red', "purple"],
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
          text: 'Nivel Activitate',
          color: 'black' 
        }
      }
    }
  });

  const countObservables = [];
  countObservables.push(this.calculatorService.getCountForActivity('Sedentar'));
  countObservables.push(this.calculatorService.getCountForActivity('Scazut'));
  countObservables.push(this.calculatorService.getCountForActivity('Moderat'));
  countObservables.push(this.calculatorService.getCountForActivity('Ridicat'));
  countObservables.push(this.calculatorService.getCountForActivity('Foarteridicat'));

  forkJoin(countObservables).subscribe(counts => {
    this.updateChartDataActivity(counts);
  });
}

//user statistics
 fetchBmiAllCategories(): Observable<Bmi_result[]> {
   return this.calculatorService.fetchBmiAllCategories();
 }

 fetchAllActivity(): Observable<UserInfo[]> {
  console.log('fetchBmiAllCategories called');
   return this.calculatorService.fetchAllActivity();
 }

}
