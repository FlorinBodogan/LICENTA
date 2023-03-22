import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
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
lineChart: any;

updateChartData(data: number[]) {
  this.lineChart.data.datasets[0].data = data;
  this.lineChart.update();
}

ngOnInit(): void {
  this.userBmiCategory = this.fetchBmiAllCategories();
  console.log(this.userBmiCategory);
  
  this.displayChart();

  this.userBmiCategory.subscribe((data: Bmi_result[]) => {
    const counts = [
      data.filter((item) => item.category === 'Subponderal').length,
      data.filter((item) => item.category === 'Normal').length,
      data.filter((item) => item.category === 'Supraponderal').length,
      data.filter((item) => item.category === 'Obez').length,
    ];
    this.updateChartData(counts);
  });
}

displayChart() {
  this.lineChart = new Chart('barChart', {
    type: 'bar',
    data: {
      labels: ["Subponderal", "Normal", "Supraponderal", "Obez"], 
      datasets: [{
        label: 'Indecele de masa corporala la nivelul tuturor utilizatorilor',
        data: [] as Array<number>,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: ['blue', 'yellow', 'green', 'red'],
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

  // Query the database for the count of results in each category
  const countObservables = [];
  countObservables.push(this.calculatorService.getCountForBmiCategory('Subponderal'));
  countObservables.push(this.calculatorService.getCountForBmiCategory('Normal'));
  countObservables.push(this.calculatorService.getCountForBmiCategory('Supraponderal'));
  countObservables.push(this.calculatorService.getCountForBmiCategory('Obez'));

  forkJoin(countObservables).subscribe(counts => {
    // Update the chart data with the counts
    this.updateChartData(counts);
  });
}

//user statistics
fetchBmiAllCategories(): Observable<Bmi_result[]> {
  return this.calculatorService.fetchBmiAllCategories();
}


}
