import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Observable } from 'rxjs';
import { Chart, registerables } from 'node_modules/chart.js';
import { Rmb_result } from 'src/app/models/Rmb_result';
Chart.register(...registerables); 

@Component({
  selector: 'app-rmb',
  templateUrl: './rmb.component.html',
  styleUrls: ['./rmb.component.css']
})
export class RmbComponent {

  userRmbResult: Observable<Rmb_result[]>;
  userRmbDateResult: Observable<Rmb_result[]>;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {

    this.userRmbResult = this.fetchAllRmb();
    this.userRmbDateResult = this.fetchRmbAllDate();
    
    this.displayChartRMB();
  }

  //RATA METABOLICA BAZALA
  displayChartRMB() {
    const lineChart = new Chart('chartRMB', {
      type: 'bar',
      data: {
        labels: [] as Array<string>, 
        datasets: [{
          label: 'Rata Metabolica Bazala',
          data: [] as Array<number>,
          borderWidth: 4,
          borderColor: 'yellow',
          backgroundColor: ['yellow'],
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
            text: 'RMB',
            color: 'white' 
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

  //RMB
  fetchAllRmb(): Observable<Rmb_result[]> {
    return this.calculatorService.fetchAllRmb();
  }
  fetchRmbAllDate(): Observable<Rmb_result[]> {
    return this.calculatorService.fetchRmbAllDate();
  }

}
