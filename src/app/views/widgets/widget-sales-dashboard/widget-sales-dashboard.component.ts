import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { getStyle } from '@coreui/utils/src';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { SwalService } from 'src/_services/swal-service';
import { GlobalService } from 'src/_shared/api/service';
import { GlobalApi } from 'src/_shared/api/api';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

@Component({
  selector: 'app-widget-sales-dashboard',
  templateUrl: './widget-sales-dashboard.component.html',
  styleUrls: ['./widget-sales-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetSalesDashboardComponent implements OnInit, AfterContentInit {
  // public title = 'CoreUI Icons';
  // public icons!: [string, string[]][];

  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  currentdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');

  currentsales: number = 0;
  prevsales: number = 0;
  currentsalesofthemonth: number = 0;
  currentsalesoftheyear: number = 0;

  constructor(
    private globalservice: GlobalService,
    private swal: SwalService,
    private changeDetectorRef: ChangeDetectorRef,
    private iconSet: IconSetService
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

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

  datasets = [
    [
      {
        label: 'My First dataset',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: [65, 59, 84, 84, 51, 55, 40],
      },
    ],
    [
      {
        label: 'My Second dataset',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-info'),
        pointHoverBorderColor: getStyle('--cui-info'),
        data: [1, 18, 9, 17, 34, 22, 11],
      },
    ],
    [
      {
        label: 'My Third dataset',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-warning'),
        pointHoverBorderColor: getStyle('--cui-warning'),
        data: [78, 81, 80, 45, 34, 12, 40],
        fill: true,
      },
    ],
    [
      {
        label: 'My Fourth dataset',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
        barPercentage: 0.7,
      },
    ],
  ];

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
        min: 30,
        max: 89,
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

    this.currentsales = 0.00;
    console.log(this.currentsales);
    // this.setData();
    // this.getMonthlySalesSummary('2022-05-02');
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx],
      };
    }
    this.setOptions();
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

  genDataList(date: string){
    return new Promise((resolve) => {
      const data = this.globalservice.getAuthData(
        'OrderHeaders',
        'GetMonthlySalesSummary/' + date
      )
      data.then((output) => {
        const json = JSON.parse(output as any);
        resolve(json);
      });
    });
  }

  getMonthlySalesSummary(date: string) {
    this.genDataList(date).then((output) => {
      for (var a of output as any) {
        // console.log('Monthly Sales Summary', a);
  
        switch (a.ins_Type) {
          case 'CD':
            this.currentsales = a.ins_TotalAmount;
            break;
          case 'PD':
            this.prevsales = a.ins_TotalAmount;
            break;
          case 'CM':
            this.currentsalesofthemonth = a.ins_TotalAmount;
            break;
          case 'CY':
            this.currentsalesoftheyear = a.ins_TotalAmount;
            break;
  
          default:
            break;
        }
      }
    });
  }


}
