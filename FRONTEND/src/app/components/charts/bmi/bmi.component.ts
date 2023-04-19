import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Observable } from 'rxjs';

import { Bmi_result } from 'src/app/models/Bmi_result';
import { Chart, registerables } from 'node_modules/chart.js';
import { Rmb_result } from 'src/app/models/Rmb_result';
Chart.register(...registerables); 

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent {

  userBmiResult: Observable<Bmi_result[]>;
  userBmiDateResult: Observable<Bmi_result[]>;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {

    this.userBmiResult = this.fetchAllBmi();
    this.userBmiDateResult = this.fetchBmiAllDate();
    
    this.displayChartBMI();
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
}
