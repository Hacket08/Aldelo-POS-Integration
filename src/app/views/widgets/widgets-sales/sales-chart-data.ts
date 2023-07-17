import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { Chart } from 'chart.js/auto';
import { GlobalService } from 'src/_shared/api/service';
import { GlobalApi } from 'src/_shared/api/api';
import { MonthlySales } from 'src/_model/monthly-sales/monthly-sales';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class SalesChartData {
  public monthlydata: any = [];
  public getlabels: string[] = [];

  constructor(private globalservice: GlobalService) {
    this.initMainChart();
  }

  public mainChart: IChartProps = {};

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async initMainChart(period: string = 'Month') {


    this.mainChart['elements'] = period === 'Month' ? 36 : 27;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['Data3'] = [];
    // this.getMonthlySales('2022-05-13');

    const brandSuccess = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfo = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfoBg = hexToRgba(getStyle('--cui-success'), 30) ?? '#4dbd74';
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';


    const colors = [
      {
        // brandSuccess
        type: 'line',
        backgroundColor: brandInfoBg,
        borderColor: brandInfo || '#4dbd74',
        pointHoverBackgroundColor: '#fff',
        fill: true,
      },
      {
        // brandInfo
        type: 'bar',
        backgroundColor: brandSuccess,
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        // borderWidth: 2,
        // fill: true,
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
      },
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Net Sales',
        ...colors[0],
      },
      {
        data: this.mainChart['Data2'],
        label: 'Total Sales',
        ...colors[1],
      },
      {
        data: this.mainChart['Data3'],
        label: 'BEP',
        ...colors[2],
      },
    ];

    // const datasets = [
    //   {
    //     data: [
    //       302,
    //       284,
    //       292,
    //       250,
    //       244,
    //       280,
    //       334,
    //       372,
    //       266,
    //       226,
    //       268,
    //       252,
    //       296,
    //       329,
    //       326,
    //       256,
    //       258,
    //       268,
    //       272,
    //       290,
    //       348,
    //       303,
    //       258,
    //       247,
    //       231,
    //       287,
    //       261,
    //       299,
    //       325,
    //       290,
    //       298
    //   ],
    //     label: 'Transaction Count',
    //     type: 'line',
    //     backgroundColor: brandInfoBg,
    //     borderColor: brandInfo || '#4dbd74',
    //     pointHoverBackgroundColor: '#fff',
    //     fill: true,
    //   },
    //   {
    //     data: [
    //       106587,
    //       76560,
    //       101959,
    //       72020,
    //       74823,
    //       101756,
    //       133468,
    //       151153,
    //       86220,
    //       65927,
    //       75168,
    //       74394,
    //       95420,
    //       108319,
    //       111326,
    //       74360,
    //       76743.839996,
    //       79981,
    //       83459,
    //       88118,
    //       106311,
    //       105092,
    //       84048,
    //       78260,
    //       75172,
    //       87162,
    //       83805,
    //       98447,
    //       109936,
    //       83830,
    //       88667
    //   ],
    //     label: 'Total Sales',
    //     type: 'bar',
    //     backgroundColor: brandSuccess,
    //     borderColor: brandSuccess,
    //     pointHoverBackgroundColor: brandSuccess,
    //   },
    //   {
    //     data: [
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000,
    //       100000
    //   ],
    //     label: 'BEP',
    //     backgroundColor: 'transparent',
    //     borderColor: brandDanger || '#f86c6b',
    //     pointHoverBackgroundColor: brandDanger,
    //     borderWidth: 1,
    //     borderDash: [8, 5],
    //   },
    // ];

    const plugins = {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          labelColor: function (context: any) {
            return {
              backgroundColor: context.dataset.borderColor,
            };
          },
        },
      },
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            display: false,
            drawOnChartArea: false,
          },
          ticks: {
            maxTicksLimit: 10,
            stepSize: 5,
            font: {
              family: 'Trebuchet MS', // Your font family
              size: 12,
            },
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 180000,
          ticks: {
            maxTicksLimit: 8,
            stepSize: Math.ceil(180000 / 6),
            font: {
              family: 'Trebuchet MS', // Your font family
              size: 12,
            },
          },
        },
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    // console.log(datasets);
    // console.log(this.getlabels);

    // for (var a of datasets) {
    //   console.log('result', a);
    // }
    this.mainChart.data = {
      datasets,
      labels: this.getlabels,
    };

    // window.dispatchEvent(new Event('resize'));
    // window.onload(new Event('resize'));
  }

  // async initMainChartData(period: string = 'Month') {
  //   this.monthlydata = await new Promise(() => {
  //     this.getMonthlySales('2022-05-02');
  //   });
  //   console.log(this.monthlydata);
  // }

  genDataList(date: string) {
    return new Promise((resolve) => {
      const data = this.globalservice.getAuthData(
        'OrderHeaders',
        'GetDailySalesPerMonth/' + date
      );
      // this.monthlydata = {};
      data.then((output) => {
        resolve(output);
      });
    });
  }

  async getMonthlySales(date: string) {
    new Promise(() => {
      const data = this.genDataList(date);
      // this.monthlydata = {};
      data.then((output) => {
        const json = JSON.parse(output as any);

        for (var a of json as any) {
          // console.log('Day ' + a.ins_Day);
          this.getlabels.push('Day ' + a.ins_Day);
          this.mainChart['Data1'].push(a.ins_PreviousTotalAmount);
          this.mainChart['Data2'].push(a.ins_CurrentTotalAmount);
          this.mainChart['Data3'].push(100000);
        }
        
      });

      
      console.log(data);
    });

    // const output = await this.genDataList(date).then().finally();
    // console.log(output);
    // const json = JSON.parse(output as any);

    // new Promise(() => {
    //   for (var a of json as any) {
    //     // console.log('Day ' + a.ins_Day);
    //     this.getlabels.push('Day ' + a.ins_Day);
    //     this.mainChart['Data1'].push(a.ins_PreviousTotalAmount);
    //     this.mainChart['Data2'].push(a.ins_CurrentTotalAmount);
    //     this.mainChart['Data3'].push(100000);
    //   }
    // });


    
    // return output;
  }

}
