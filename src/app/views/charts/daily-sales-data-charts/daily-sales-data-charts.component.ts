import { Component, OnInit, NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
// import { DashboardSalesDataCharts, IChartProps  } from './dashboard-sales-data-charts';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { SalesData } from 'src/app_shared/models/sales-data';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { HttpErrorResponse } from '@angular/common/http';
import { interval } from 'rxjs';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Component({
  selector: 'app-daily-sales-data-charts',
  templateUrl: './daily-sales-data-charts.component.html',
  styleUrls: ['./daily-sales-data-charts.component.scss']
})
export class DailySalesDataChartsComponent implements OnInit {


  documentType: string = 'OrderHeaders';
  salesdata: SalesData[] = [];
  getdata: SalesData[] = [];
  getInsDay: number[] = [];
  uniqueInsDay: number[] = [];

  maxTotalAmount: number = 0;

  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  currentdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  previousdate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() - 1),
    'yyyy-MM-dd'
  );


  constructor(
    // private chartsData: DashboardSalesDataCharts, 
    private apiservice: GlobalApiService, private ngZone: NgZone, private cdRef: ChangeDetectorRef
  ) {

  }

  viewChart: IChartProps = {};
  public mainChart: IChartProps = {};
  public x: IChartProps = {};
  public chart: Array<IChartProps> = [];
  viewdata: any;


  ngOnInit(): void {

    interval(10000) // 10 seconds = 10,000 milliseconds
    .subscribe(async () => {
      this.ngZone.run(async () => {
        this.fetchSalesData();
      });
    });
  }

  private fetchSalesData(): void {
    this.apiservice.getData(this.documentType, 'GetAccumulatedSalesDataMonth', `${this.currentdate}/OLD TOWN`).subscribe(
      (data: any) => {
        this.salesdata = data;
        this.getInsDay = Array.from(new Set(this.salesdata.map(salesData => salesData.ins_Day)));
        this.maxTotalAmount = Math.round(this.getMaxTotalAmount() * 1.20);

        this.setupMainChart();
      },
      (error: any) => {
        console.error("Error fetching sales data", error);
      }
    );
  }

  private getMaxTotalAmount(): number {
    if (this.salesdata && this.salesdata.length > 0) {
      // Use reduce to find the maximum TotalAmount
      const maxTotalAmount = this.salesdata.reduce((max, salesData) => {
        return (salesData.ins_TotalAmount > max) ? salesData.ins_TotalAmount : max;
      }, this.salesdata[0].ins_TotalAmount); // Initialize max with the first TotalAmount

      return maxTotalAmount;
    } else {
      return 0; // Or another appropriate default value
    }
  }

  private setupMainChart(): void {

    // let dateObjects = this.getInsDay.map(insDay => new Date(`2000-01-01T${insDay}:00`));

    // // Find the minimum and maximum timestamps
    // let minTimestamp = Math.min(...dateObjects.map(date => date.getTime()));
    // let maxTimestamp = Math.max(...dateObjects.map(date => date.getTime()));

    // // Create new Date objects using the timestamps
    // let minDate = new Date(minTimestamp);
    // let maxDate = new Date(maxTimestamp);

    // // Subtract 1 hour from the minimum date
    // minDate.setHours(minDate.getHours() - 1);

    // // Add 1 hour to the maximum date
    // maxDate.setHours(maxDate.getHours() + 1);

    // // Extract the adjusted minimum and maximum hours as numbers
    // let adjustedMinHourNumber = minDate.getHours() + minDate.getMinutes() / 60;
    // let adjustedMaxHourNumber = maxDate.getHours() + maxDate.getMinutes() / 60;



    // Include adjusted minimum and maximum hours in uniqueInsHours
    this.uniqueInsDay = [...this.getInsDay];
    this.mainChart['elements'] = this.uniqueInsDay.length;

    let uniqueInsBranchCode = Array.from(new Set(this.salesdata.map(salesData => salesData.ins_BranchCode)));
    uniqueInsBranchCode.forEach(branchCode => {
      this.mainChart[branchCode] = [];
    });

    const options = this.createChartOptions();
    const datasets = this.createChartDatasets();
    const labels = this.createChartLabels();

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
  }

  private createChartOptions(): any {
    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function (context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    return {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: this.maxTotalAmount,
          ticks: {
            maxTicksLimit: 10,
            stepSize: Math.ceil(this.maxTotalAmount / 10)
          }
        }
      },
      elements: {
        line: {
          tension: 0
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };
  }

  private createChartDatasets(): any[] {
    const brandInfo = getStyle('--cui-info') ?? '#4dbd74';
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';
    const brandWarning = getStyle('--cui-warning') || '#f86c6b';
    const brand1 = '#7F27FF';
    const brand2 = '#FF8911';
    const brand3 = '#436850';
    const brand4 = '#2D9596';
    const brand5 = '#FC6736';

    // const brand6 = '#7F27FF';
    // const brand7 = '#7F27FF';
    // const brand8 = '#7F27FF';
    // const brand9 = '#7F27FF';
    // const brand10 = '#7F27FF';

    const colors = [
      {
        backgroundColor: 'transparent',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brandDanger,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brandWarning,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brand1,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brand2,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brand3,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brand4,
        pointHoverBackgroundColor: '#fff'
      },
      {
        backgroundColor: 'transparent',
        borderColor: brand5,
        pointHoverBackgroundColor: '#fff'
      }
    ];

    // let uniqueInsHours = Array.from(new Set(this.salesdata.map(salesData => salesData.ins_Hour)));
    let uniqueInsBranchCode = Array.from(new Set(this.salesdata.map(salesData => salesData.ins_BranchCode)));

    this.uniqueInsDay.forEach(day => {
      uniqueInsBranchCode.forEach(branchCode => {
        let totalAmount = this.salesdata
          .filter(salesData => salesData.ins_BranchCode === branchCode && salesData.ins_Day === day)
          .reduce((sum, salesData) => sum + salesData.ins_TotalAmount, 0);

        this.mainChart[branchCode].push(totalAmount);
      });
    });

    let x = 0;
    const datasets = uniqueInsBranchCode.map((branchCode, index) => {
      x++;
      const dataset = {
        data: this.mainChart[branchCode],
        label: `Branch ${branchCode}`,
        ...colors[x], // Assuming colors is an array of color configurations
      };
      return dataset;
    });


    return datasets;
  }

  private createChartLabels(): string[] {
    let labels: string[] = [];
    this.uniqueInsDay.forEach(hour => {
      labels.push(hour as any)
    });
    return labels;
  }




}
