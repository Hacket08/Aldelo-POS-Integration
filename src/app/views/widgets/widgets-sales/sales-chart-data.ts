import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils/src';

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
  providedIn: 'any',
})
export class SalesChartData {
  constructor() {
    this.initMainChart();
  }

  public mainChart: IChartProps = {};

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfo = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfoBg = hexToRgba(getStyle('--cui-success'), 30) ?? '#4dbd74';
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    // mainChart
    // mainChart
    this.mainChart['elements'] = period === 'Month' ? 36 : 27;
    this.mainChart['Data1'] = [];
    this.mainChart['Data2'] = [];
    this.mainChart['Data3'] = [];

    // generate random values for mainChart
    for (let i = 0; i <= this.mainChart['elements']; i++) {
      this.mainChart['Data1'].push(this.random(100000, 250000));
      this.mainChart['Data2'].push(this.random(100000, 500000));
      this.mainChart['Data3'].push(250000);
    }

    let labels: string[] = [];
    labels = [
      'Jan 30',
      'Feb 28',
      'Mar 10',
      'Apr 10',
      'May 10',
      'Jun 10',
      'Jul 10',
      'Aug 10',
      'Sep 10',
      'Oct 10',
      'Nov 10',
      'Dec 10',
      'Jan 30',
      'Feb 28',
      'Mar 10',
      'Apr 10',
      'May 10',
      'Jun 10',
      'Jul 10',
      'Aug 10',
      'Sep 10',
      'Oct 10',
      'Nov 10',
      'Dec 10',
      'Jan 30',
      'Feb 28',
      'Mar 10',
      'Apr 10',
      'May 10',
      'Jun 10',
      'Jul 10',
      'Aug 10',
      'Sep 10',
      'Oct 10',
      'Nov 10',
      'Dec 10',
    ];

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
        label: 'Current',
        ...colors[0],
      },
      {
        data: this.mainChart['Data2'],
        label: 'Previous',
        ...colors[1],
      },
      {
        data: this.mainChart['Data3'],
        label: 'BEP',
        ...colors[2],
      },
    ];

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
            minRotation: 0
          },
        },
        y: {
          beginAtZero: true,
          max: 500000,
          ticks: {
            maxTicksLimit: 8,
            stepSize: Math.ceil(500 / 4),
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
    this.mainChart.data = {
      datasets,
      labels,
    };
  }
}
