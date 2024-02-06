import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../_services/user.api';
import { DailySales } from '../../../../_model/daily-sales/daily-sales';

import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { SalesData } from "src/app_shared/models/sales-data";

import { NgZone } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-widgets-dashboard',
  templateUrl: './widgets-dashboard.component.html',
  styleUrls: ['./widgets-dashboard.component.scss']
})
export class WidgetsDashboardComponent implements OnInit {
  documentType: string = 'OrderHeaders';
  dataList: DailySales[] = [];
  userInfo: any;


  salesdata : SalesData[] = [];
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();

  currentdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  previousdate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() - 1),
    'yyyy-MM-dd'
  );


  dailytotalsales: number;
  yesttotalsales: number;
  monthlytotalsales: number;
  yearlytotalsales: number;

  constructor(private apiservice: GlobalApiService, private user: Users, private ngZone: NgZone) {}

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

    this.dailytotalsales = 0;
    this.yesttotalsales = 0;
    this.monthlytotalsales = 0;
    this.yearlytotalsales = 0;

    let response: any;
    // response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesData');

    // console.log(this.currentdate);
    // console.log(this.previousdate);


    // response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesData');

    // response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesData', `${this.currentdate}`);
    response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesData', `${this.currentdate}`);
    // console.log(response);
    for (var v of response){
      this.dailytotalsales = v.ins_TotalAmount;
    }

    response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesData', `${this.previousdate}`);
    for (var v of response){
      this.yesttotalsales = v.ins_TotalAmount;
    }
    
    response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesDataMonth', `${this.currentdate}`);
    for (var v of response){
      this.monthlytotalsales = v.ins_TotalAmount;
    }

    response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesDataYear', `${this.currentdate}`);
    for (var v of response){
      this.yearlytotalsales = v.ins_TotalAmount;
    }



    // this.dataList = (await this.globalservice.getAuthList('Sales/GetDailySalesPerDay')) as any;
    // // this.dailysales = data.ins_TotalAmount;
    // // console.log("GetDailySalesPerDay", this.dataList);
    // for (var a of this.dataList as any) {
    //   this.dailytotalsales = a.ins_TotalAmount;
    //   this.monthlytotalsales = a.ins_TotalAmount;
    //   this.yearlytotalsales = a.ins_TotalAmount;
    // }
    // // console.log("GetDailySalesPerDay", this.dailytotalsales);
  }

}
