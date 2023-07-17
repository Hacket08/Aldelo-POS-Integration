import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../_services/user.api';
import { DailySales } from '../../../../_model/daily-sales/daily-sales';

import { NgZone } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-widgets-dashboard',
  templateUrl: './widgets-dashboard.component.html',
  styleUrls: ['./widgets-dashboard.component.scss']
})
export class WidgetsDashboardComponent implements OnInit {
  dataList: DailySales[] = [];
  userInfo: any;
  dailytotalsales: number;
  yesttotalsales: number;
  monthlytotalsales: number;
  yearlytotalsales: number;

  constructor(private globalservice: GlobalService, private user: Users, private ngZone: NgZone) {}

  async ngOnInit(): Promise<void> {
    await this.getSalesData();
    
    interval(10000) // 10 seconds = 10,000 milliseconds
    .subscribe(async () => {
      this.ngZone.run(async () => {
        await this.getSalesData();
      });
    });
  }

  async getSalesData(): Promise<void>  {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();
    this.yesttotalsales = 0;
    this.monthlytotalsales = 0;
    this.yearlytotalsales = 0;

    this.dataList = (await this.globalservice.getAuthList('Sales/GetDailySalesPerDay')) as any;
    // this.dailysales = data.ins_TotalAmount;
    // console.log("GetDailySalesPerDay", this.dataList);
    for (var a of this.dataList as any) {
      this.dailytotalsales = a.ins_TotalAmount;
      this.monthlytotalsales = a.ins_TotalAmount;
      this.yearlytotalsales = a.ins_TotalAmount;
    }
    // console.log("GetDailySalesPerDay", this.dailytotalsales);
  }

}
