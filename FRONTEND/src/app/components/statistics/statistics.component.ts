import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { UserInfo} from 'src/app/models/UserInfo'; 
import { forkJoin, Observable } from 'rxjs';
import { Bmi_result } from 'src/app/models/Bmi_result';
import { CalculatorService } from 'src/app/services/calculator.service';
import { ArterialTension } from 'src/app/models/ArterialTension';
import { Triglycerides } from 'src/app/models/Triglycerides';
import { Colesterol } from 'src/app/models/Colesterol';
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
userTRCategory: Observable<Triglycerides[]>;
userColCategory: Observable<Colesterol[]>;

bmiChart: any;
activityChart: any;
arterialChart: any;
trygliceridesChart: any;
colesterolChart: any;

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

updateChartDataColesterol(data: number[]) {
  this.colesterolChart.data.datasets[0].data = data;
  this.colesterolChart.update();
}

ngOnInit(): void {
  this.userBmiCategory = this.fetchBmiAllCategories();
  this.userActivity = this.fetchAllActivity();
  this.userATCategory = this.fetchATAllCategories();
  this.userTRCategory = this.fetchTRAllCategories();
  this.userColCategory = this.fetchColAllCategories();
  
  this.displayChartBmi();
  this.displayChartActivity();
  this.displayChartArterial();
  this.displayChartTryglicerides();
  this.displayChartColesterol();

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

  this.userTRCategory.subscribe((data: Triglycerides[]) => {
    const counts = [
      data.filter((item) => item.result === 'Normal').length,
      data.filter((item) => item.result === 'Limita Normalului').length,
      data.filter((item) => item.result === 'Ridicat').length,
      data.filter((item) => item.result === 'Foarte Ridicat').length,
    ];
    this.updateChartDataTryglicerides(counts);
  });

  this.userColCategory.subscribe((data: Colesterol[]) => {
    const counts = [
      data.filter((item) => item.result === 'Normal').length,
      data.filter((item) => item.result === 'Limita Normalului').length,
      data.filter((item) => item.result === 'Ridicat').length,
    ];
    this.updateChartDataColesterol(counts);
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
      aspectRatio: 2.5,
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
      aspectRatio: 2.5,
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
      aspectRatio: 2.5,
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
          text: 'Nivel Tensiune Arteriala',
          color: 'black' 
        }
      }
    }
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
      aspectRatio: 2.5,
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
}

displayChartColesterol() {
  this.colesterolChart = new Chart('colesterolChart', {
    type: 'pie',
    data: {
      labels: ["Normal", "Limita Normalului", "Ridicat"], 
      datasets: [{
        label: 'Nivelul colesterolului la nivelul tututor utilizatorilor',
        data: [] as Array<number>,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: ['red', 'yellow', 'green'],
      }]
    },
    options: {
      aspectRatio: 2.5,
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

 fetchTRAllCategories(): Observable<Triglycerides[]> {
   return this.calculatorService.fetchTRAllCategories();
 }

 fetchColAllCategories(): Observable<Colesterol[]> {
   return this.calculatorService.fetchCOLAllCategories();
 }

}
