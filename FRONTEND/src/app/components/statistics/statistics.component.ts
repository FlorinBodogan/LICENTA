import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Observable } from 'rxjs';
import { Bmi_result } from 'src/app/models/Bmi_result';
import { CalculatorService } from 'src/app/services/calculator.service';
Chart.register(...registerables); 

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  userBmiResult: Observable<Bmi_result[]>;
  userBmiDateResult: Observable<Bmi_result[]>;

  constructor(private calculatorService:CalculatorService) {}

  ngOnInit(): void {
    this.userBmiResult = this.fetchAllBmi();
    this.userBmiDateResult = this.fetchBmiAllDate();
    this.displayChart();
  }

  displayChart() {
    const lineChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: [] as Array<string>, 
        datasets: [{
          label: 'Evolutia indicelui de masa corporala',
          data: [] as Array<number>,
          borderWidth: 3,
          borderColor: 'white',
          backgroundColor: ['blue', 'yellow', 'green', 'purple', 'orange'],
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

  //user statistics
  fetchAllBmi(): Observable<Bmi_result[]> {
    return this.calculatorService.fetchAllBmi();
  }
  fetchBmiAllDate(): Observable<Bmi_result[]> {
    return this.calculatorService.fetchBmiAllDate();
  }

}
