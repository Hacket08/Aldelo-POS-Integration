import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SalesChartData, IChartProps } from './sales-chart-data';
import { GlobalService } from 'src/_shared/api/service';
import { GlobalApi } from 'src/_shared/api/api';
import { MonthlySales } from 'src/_model/monthly-sales/monthly-sales';
import { empty } from 'rxjs';

@Component({
  selector: 'app-widgets-sales',
  templateUrl: './widgets-sales.component.html',
  styleUrls: ['./widgets-sales.component.scss'],
})
export class WidgetsSalesComponent implements OnInit {
  currentcount: number;
  prevcount: number;
  prevcountlastyear: number;

  currentpercent: number;
  prevpercent: number;
  prevpercentlastyear: number;

  
  indicator1: string = "up";
  status1: string = "success";
  
  indicator2: string = "up";
  status2: string = "success";
  indicator3: string = "up";
  status3: string = "success";

  currentcountofthemonth: number;
  currentcountoftheyear: number;

  constructor(
    private chartsData: SalesChartData,
    private globalservice: GlobalService
  ) {}

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month'),
  });

  ngOnInit() {
    this.initCharts();


  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    // this.getMonthlySalesSummary('2022-05-13');
    // window.location.reload();
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  genDataList(date: string) {
    return new Promise((resolve) => {
      const data = this.globalservice.getAuthData(
        'OrderHeaders',
        'GetMonthlySalesSummary/' + date
      );
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
          case 'CM':
            this.currentcount = a.ins_TotalCount;
            break;
          case 'PM':
            this.prevcount = a.ins_TotalCount;
            break;
          case 'PMY':
            this.prevcountlastyear = a.ins_TotalCount;
            break;

          default:
            break;
        }
      }
    

      if (this.prevcount > 0  && this.currentcount > 0) {
        this.currentpercent = ( this.currentcount ) / this.prevcount * 100;
        if (this.currentcount < this.prevcount) {
          this.currentpercent = this.currentpercent;
          this.indicator1 = "down";
          this.status1 = "danger";
        }
      } else if (this.prevcount <= 0  && this.currentcount > 0) {
        this.currentpercent = this.currentpercent;
        this.currentpercent = 100;
        this.indicator1 = "up";
        this.status1 = "success";
      }
      else{
        this.currentpercent = 0;
        this.indicator1 = "down";
        this.status1 = "danger";
      }


      
      if (this.prevcountlastyear > 0 && this.prevcount > 0) {
        this.prevpercent = ( this.prevcount ) / this.prevcountlastyear * 100;
        if (this.currentcount < this.prevcount) {
          this.prevpercent = this.currentpercent * -1;
          this.indicator2 = "down";
          this.status2 = "danger";
        }
      } else if (this.prevcountlastyear <= 0  && this.prevcount > 0) {
        this.prevpercent = 100;
        this.indicator2 = "up";
        this.status2 = "success";
      }
      else {
        this.prevpercent = 0;
        this.indicator2 = "down";
        this.status2 = "danger";
      }



      if (this.prevcountlastyear <= 0) {
        this.prevpercentlastyear = 0;
        this.indicator3 = "down";
        this.status3 = "danger";
      } else {
        this.prevpercentlastyear = 100;
        this.indicator3 = "up";
        this.status3 = "success";
      }

    });
  }
}
