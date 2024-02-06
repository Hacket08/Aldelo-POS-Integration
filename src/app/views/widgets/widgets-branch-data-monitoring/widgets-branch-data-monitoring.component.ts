import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../_services/user.api';
import { DailySales } from '../../../../_model/daily-sales/daily-sales';

import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { SalesData } from "src/app_shared/models/sales-data";

import { NgZone } from '@angular/core';
import { interval } from 'rxjs';

// import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
// import { SalesChartData } from '../../views/widgets/widgets-sales/sales-chart-data';
import { BranchData } from 'src/app_shared/models/branch-data';



@Component({
  selector: 'app-widgets-branch-data-monitoring',
  templateUrl: './widgets-branch-data-monitoring.component.html',
  styleUrls: ['./widgets-branch-data-monitoring.component.scss']
})
export class WidgetsBranchDataMonitoringComponent implements OnInit {
  documentType: string = 'OrderHeaders';
  dataList: DailySales[] = [];
  userInfo: any;
  perc_color: any = null;

  branchdata: BranchData[] = [];

  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  
  currdate = this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss');
  currentdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  previousdate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() - 1),
    'yyyy-MM-dd'
  );

  dailytotalsales: number;

  constructor(private apiservice: GlobalApiService, private user: Users, private ngZone: NgZone) { }

  async ngOnInit(): Promise<void> {
    await this.getSalesData();

    interval(10000) // 10 seconds = 10,000 milliseconds
      .subscribe(async () => {
        this.ngZone.run(async () => {
          // Update the current date on each interval
          this.currdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

          await this.getSalesData();
        });
      });

  }

  async getSalesData(): Promise<void> {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();

    // this.currdate = this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss');

    this.dailytotalsales = 0;

    let response: any;
    response = await this.apiservice.getDataAsync(this.documentType, 'GetSalesData', `${this.currentdate}/OLD TOWN`);
    for (var v of response) {
      this.dailytotalsales = v.ins_TotalAmount;
    }


    response = await this.apiservice.getDataAsync(this.documentType, 'GetBranchData', `${this.currentdate}/OLD TOWN`);
    this.branchdata = [];
    for (var v of response) {

      let dateuploaded = this.datepipe.transform(v.ins_DateUploaded, 'yyyy-MM-dd HH:mm:ss');

      let getCurrentDate = new Date(this.currdate);
      let getDateUploaded = new Date(dateuploaded);

      // Calculate the time difference in milliseconds
      let timeDifference = getCurrentDate.getTime() - getDateUploaded.getTime();

      // Calculate the difference in days, hours, minutes, and seconds
      let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);


      let status = "ON LINE";
      let color = "success";
      if (hours > 2) {
        status = "OFF LINE"
        color = "danger";
      }

      let percentage = ((v.ins_TotalAmount / this.dailytotalsales) * 100) as number;
      let newdata = new BranchData(v.ins_BranchCode, v.ins_BranchName, dateuploaded, this.currentdate, v.ins_TotalAmount, percentage, status, color);
      this.branchdata.push(newdata);
    }
  }
}
