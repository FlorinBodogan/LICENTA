import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { UserInfo} from 'src/app/models/UserInfo'; 
import { forkJoin, Observable } from 'rxjs';
import { Bmi_result } from 'src/app/models/Bmi_result';
import { CalculatorService } from 'src/app/services/calculator.service';
import { ArterialTension } from 'src/app/models/ArterialTension';
import { Tryglicerides } from 'src/app/models/Tryglicerides';
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
userATCategory: Observable<ArterialTension[]>;
userTRCategory: Observable<Tryglicerides[]>;

bmiChart: any;
activityChart: any;
arterialChart: any;
trygliceridesChart: any;

updateChartDataBmi(data: number[]) {
  this.bmiChart.data.datasets[0].data = data;
  this.bmiChart.update();
}

updateChartDataActivity(data: number[]) {
  this.activityChart.data.datasets[0].data = data;
  this.activityChart.update();
}

updateChartDataArterial(data: number[]) {
  this.arterialChart.data.datasets[0].data = data;
  this.arterialChart.update();
}

updateChartDataTryglicerides(data: number[]) {
  this.trygliceridesChart.data.datasets[0].data = data;
  this.trygliceridesChart.update();
}

ngOnInit(): void {
  this.userBmiCategory = this.fetchBmiAllCategories();
  this.userActivity = this.fetchAllActivity();
  this.userATCategory = this.fetchATAllCategories();
  this.userTRCategory = this.fetchTRAllCategories();
  
  this.displayChartBmi();
  this.displayChartActivity();
  this.displayChartArterial();
  this.displayChartTryglicerides();

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
    const counts = [
      data.filter((item) => item.activitylevel === 'sedentar').length,
      data.filter((item) => item.activitylevel === 'scazut').length,
      data.filter((item) => item.activitylevel === 'moderat').length,
      data.filter((item) => item.activitylevel === 'ridicat').length,
      data.filter((item) => item.activitylevel === 'foarteridicat').length,
    ];
    this.updateChartDataActivity(counts);
  });

  this.userATCategory.subscribe((data: ArterialTension[]) => {
    const counts = [
      data.filter((item) => item.result === 'Optim').length,
      data.filter((item) => item.result === 'Normal').length,
      data.filter((item) => item.result === 'Normal crescut').length,
      data.filter((item) => item.result === 'Gradul I de hipertensiune').length,
      data.filter((item) => item.result === 'Gradul II de hipertensiune').length,
      data.filter((item) => item.result === 'Gradul III de hipertensiune').length,
      data.filter((item) => item.result === 'Hipertensiune izolata sistolica').length,
    ];
    this.updateChartDataArterial(counts);
  });

  this.userTRCategory.subscribe((data: Tryglicerides[]) => {
    const counts = [
      data.filter((item) => item.result === 'Normal').length,
      data.filter((item) => item.result === 'Limita Normalului').length,
      data.filter((item) => item.result === 'Ridicat').length,
      data.filter((item) => item.result === 'Foarte Ridicat').length,
    ];
    this.updateChartDataTryglicerides(counts);
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
      aspectRatio: 1.5,
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
      aspectRatio: 1.5,
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

displayChartArterial() {
  this.arterialChart = new Chart('arterialChart', {
    type: 'pie',
    data: {
      labels: ["Optim", "Normal", "Normal Crescut", "Gradul I hipertensiune", "Gradul II hipertensiune", "Gradul III hipertensiune", "Hipertensiune izolata sistolica"], 
      datasets: [{
        label: 'Nivelul tensiunii arteriale la nivelul tututor utilizatorilor',
        data: [] as Array<number>,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: ['green', 'yellow', 'orange', 'brown', "purple", "red", "cyan"],
      }]
    },
    options: {
      aspectRatio: 1.5,
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
  countObservables.push(this.calculatorService.getCountForATCategory('Optim'));
  countObservables.push(this.calculatorService.getCountForATCategory('Normal'));
  countObservables.push(this.calculatorService.getCountForATCategory('Normal crescut'));
  countObservables.push(this.calculatorService.getCountForATCategory('Gradul I de hipertensiune'));
  countObservables.push(this.calculatorService.getCountForATCategory('Gradul II de hipertensiune'));
  countObservables.push(this.calculatorService.getCountForATCategory('Gradul III de hipertensiune'));
  countObservables.push(this.calculatorService.getCountForATCategory('Hipertensiune izolata sistolica'));

  forkJoin(countObservables).subscribe(counts => {
    this.updateChartDataArterial(counts);
  });
}

displayChartTryglicerides() {
  this.trygliceridesChart = new Chart('trygliceridesChart', {
    type: 'pie',
    data: {
      labels: ["Normal", "Limita Normalului", "Ridicat", "Foarte Ridicat"], 
      datasets: [{
        label: 'Nivelul trigliceridelor la nivelul tututor utilizatorilor',
        data: [] as Array<number>,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: ['red', 'yellow', 'grey', 'green'],
      }]
    },
    options: {
      aspectRatio: 1.5,
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
          text: 'Nivel Trigliceride',
          color: 'black' 
        }
      }
    }
  });

  const countObservables = [];
  countObservables.push(this.calculatorService.getCountForTRCategory('Normal'));
  countObservables.push(this.calculatorService.getCountForTRCategory('Limita Normalului'));
  countObservables.push(this.calculatorService.getCountForTRCategory('Ridicat'));
  countObservables.push(this.calculatorService.getCountForTRCategory('Foarte Ridicat'));

  forkJoin(countObservables).subscribe(counts => {
    this.updateChartDataTryglicerides(counts);
  });
}

//user statistics
 fetchBmiAllCategories(): Observable<Bmi_result[]> {
   return this.calculatorService.fetchBmiAllCategories();
 }

 fetchAllActivity(): Observable<UserInfo[]> {
   return this.calculatorService.fetchAllActivity();
 }

 fetchATAllCategories(): Observable<ArterialTension[]> {
   return this.calculatorService.fetchATAllCategories();
 }

 fetchTRAllCategories(): Observable<Tryglicerides[]> {
   return this.calculatorService.fetchTRAllCategories();
 }

}
