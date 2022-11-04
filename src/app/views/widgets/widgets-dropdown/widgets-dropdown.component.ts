import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { getStyle } from '@coreui/utils/src';
import { ChartjsComponent } from '@coreui/angular-chartjs';

import { DatePipe } from '@angular/common';
import { SwalService } from 'src/_services/swal-service';
import { GlobalService } from 'src/_shared/api/service';
import { GlobalApi } from 'src/_shared/api/api';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {
  datepipe: DatePipe = new DatePipe('en-US');
  getlabels: any[] = [];
  getdata: any[] = [];
  constructor(
    private globalservice: GlobalService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  data: any[] = [];
  options: any[] = [];

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April',
  ];

  datasets: any[] = [];

  // datasets = [
  //   [
  //     {
  //       label: 'My First dataset',
  //       backgroundColor: 'transparent',
  //       borderColor: 'rgba(255,255,255,.55)',
  //       pointBackgroundColor: getStyle('--cui-primary'),
  //       pointHoverBorderColor: getStyle('--cui-primary'),
  //       data: [65, 59, 84, 84, 51, 55, 40],
  //     },
  //   ],
  //   [
  //     {
  //       label: 'My Second dataset',
  //       backgroundColor: 'transparent',
  //       borderColor: 'rgba(255,255,255,.55)',
  //       pointBackgroundColor: getStyle('--cui-info'),
  //       pointHoverBorderColor: getStyle('--cui-info'),
  //       data: [1, 18, 9, 17, 34, 22, 11],
  //     },
  //   ],
  //   [
  //     {
  //       label: 'My Third dataset',
  //       backgroundColor: 'rgba(255,255,255,.2)',
  //       borderColor: 'rgba(255,255,255,.55)',
  //       pointBackgroundColor: getStyle('--cui-warning'),
  //       pointHoverBorderColor: getStyle('--cui-warning'),
  //       data: [78, 81, 80, 45, 34, 12, 40],
  //       fill: true,
  //     },
  //   ],
  //   [
  //     {
  //       label: 'My Fourth dataset',
  //       backgroundColor: 'rgba(255,255,255,.2)',
  //       borderColor: 'rgba(255,255,255,.55)',
  //       data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
  //       barPercentage: 0.7,
  //     },
  //   ],
  // ];

  optionsDefault = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        min: 0,
        max: 150000,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };

  ngOnInit(): void {
    this.setDataPerDay();
    this.setDataPerMonth();
    this.setDataPerHour();
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  async setDataPerDay() {
    let output0 = await Promise.resolve(this.getSevenDaysSales('2022-05-02'));
    this.getlabels[0] = [];
    this.getdata[0] = [];
    this.data[0] = [];

    for (var a of output0 as any) {
      this.getlabels[0].push(this.datepipe.transform(a.ins_Date, 'yyyy-MM-dd'));
      this.getdata[0].push(a.ins_TotalAmount);
    }
    this.datasets[0] = [
      {
        // label: this.getdata[0],
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: this.getdata[0],
      },
    ];

    this.data[0] = {
      labels: this.getlabels[0],
      datasets: this.datasets[0],
    };

    const options = JSON.parse(JSON.stringify(this.optionsDefault));
    options.scales.x = { display: false };
    options.scales.y = { display: false };
    this.options.push(options);
  }

  async setDataPerMonth() {
    let output1 = await Promise.resolve(this.getSevenMonthSales('2022-05-02'));
    this.getlabels[1] = [];
    this.getdata[1] = [];
    this.data[1] = [];

    console.log("output1", output1);
    for (var a of output1 as any) {
      this.getlabels[1].push(a.ins_Month + ' ' + a.ins_Year);
      this.getdata[1].push(a.ins_TotalAmount);
    }

    this.datasets[1] = [
      {
        // label: 'My First dataset',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: this.getdata[1],
      },
    ];

    this.data[1] = {
      labels: this.getlabels[1],
      datasets: this.datasets[1],
    };

    const options = JSON.parse(JSON.stringify(this.optionsDefault));
    options.scales.x = { display: false };
    options.scales.y = { display: false };
    this.options.push(options);
  }

  async setDataPerHour() {
    let output2 = await Promise.resolve(this.getHourlySales('2022-05-02'));
    this.getlabels[2] = [];
    this.getdata[2] = [];
    this.data[2] = [];

    for (var a of output2 as any) {
      this.getlabels[2].push(a.ins_Hour + ':00');
      this.getdata[2].push(a.ins_TotalAmount);
    }

    this.datasets[2] = [
      {
        // label: 'My First dataset',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: this.getdata[2],
      },
    ];

    this.data[2] = {
      labels: this.getlabels[2],
      datasets: this.datasets[2],
    };

    const options = JSON.parse(JSON.stringify(this.optionsDefault));
    options.scales.x = { display: false };
    options.scales.y = { display: false };
    options.elements.line.borderWidth = 2;
    options.elements.point.radius = 0;
    this.options.push(options);
  }



  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -9;
          options.scales.y.max = 39;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = {
            display: false,
            drawTicks: false,
            drawBorder: false,
          };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }

  genDataList(date: string, api: string) {
    return new Promise((resolve) => {
      const data = this.globalservice.getData('OrderHeaders', api + '/' + date);
      data.then((output) => {
        const json = JSON.parse(output as any);
        resolve(json);
      });
    });
  }

  getSevenDaysSales(date: string) {
    return this.genDataList(date, 'GetSevenDaysSales').then();
  }

  getSevenMonthSales(date: string) {
    return this.genDataList(date, 'GetSevenMonthSales').then();
  }

  getHourlySales(date: string) {
    return this.genDataList(date, 'GetHourlySales').then();
  }
}

@Component({
  selector: 'app-chart-sample',
  template:
    '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>',
})
export class ChartSample implements AfterViewInit {
  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff',
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [
      {
        data: [65, 59, 84, 84, 51, 55, 40],
        ...this.colors,
        fill: { value: 65 },
      },
    ],
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  ngAfterViewInit(): void {
    setTimeout(() => {
      const data = () => {
        return {
          ...this.data,
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          datasets: [
            {
              ...this.data.datasets[0],
              data: [42, 88, 42, 66, 77],
              fill: { value: 55 },
            },
            {
              ...this.data.datasets[0],
              borderColor: '#ffbd47',
              data: [88, 42, 66, 77, 42],
            },
          ],
        };
      };
      const newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
      const newData = [42, 88, 42, 66, 77];
      let { datasets, labels } = { ...this.data };
      // @ts-ignore
      const before = this.chartComponent?.chart?.data.datasets.length;
      console.log('before', before);
      // console.log('datasets, labels', datasets, labels)
      // @ts-ignore
      // this.data = data()
      this.data = {
        ...this.data,
        datasets: [
          { ...this.data.datasets[0], data: newData },
          {
            ...this.data.datasets[0],
            borderColor: '#ffbd47',
            data: [88, 42, 66, 77, 42],
          },
        ],
        labels: newLabels,
      };
      // console.log('datasets, labels', { datasets, labels } = {...this.data})
      // @ts-ignore
      setTimeout(() => {
        const after = this.chartComponent?.chart?.data.datasets.length;
        console.log('after', after);
      });
    }, 5000);
  }
}
