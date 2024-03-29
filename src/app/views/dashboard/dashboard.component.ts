import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { SalesChartData } from '../../views/widgets/widgets-sales/sales-chart-data';

import { DatePipe } from '@angular/common';
import { getStyle } from '@coreui/utils/src';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { SwalService } from 'src/_services/swal-service';
import { GlobalService } from 'src/_shared/api/service';
import { GlobalApi } from 'src/_shared/api/api';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private globalservice: GlobalService,
    private chartsData: DashboardChartsData, 
    private saleschartsData: SalesChartData, 
    private iconSet: IconSetService
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  public users: IUser[] = [
    {
      name: 'Branch 1',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Branch 2',
      state: 'New ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Branch 3',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Branch 4',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Branch 5',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Branch 6',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];


  public mainChart: IChartProps = {};
  public x: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }


  // genDataList(date: string){
  //   return new Promise((resolve) => {
  //     const data = this.globalservice.getData(
  //       'OrderHeaders',
  //       'GetSevenDaysSales/' + date
  //     )
  //     data.then((output) => {
  //       const json = JSON.parse(output as any);
  //       resolve(json);
  //     });
  //   });
  // }

  // getSevenDaysSales(date: string) {
  //   this.genDataList(date).then((output) => {
  //     for (var a of output as any) {
  //       // console.log('Monthly Sales Summary', a);
  
  //       switch (a.ins_Type) {
  //         case 'CD':
  //           // this.currentsales = a.ins_TotalAmount;
  //           break;
  //         case 'PD':
  //           // this.prevsales = a.ins_TotalAmount;
  //           break;
  //         case 'CM':
  //           // this.currentsalesofthemonth = a.ins_TotalAmount;
  //           break;
  //         case 'CY':
  //           // this.currentsalesoftheyear = a.ins_TotalAmount;
  //           break;
  
  //         default:
  //           break;
  //       }
  //     }
  //   });
  // }

  

}
