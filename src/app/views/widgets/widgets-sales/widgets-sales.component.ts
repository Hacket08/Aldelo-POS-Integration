import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SalesChartData, IChartProps } from './sales-chart-data';

@Component({
  selector: 'app-widgets-sales',
  templateUrl: './widgets-sales.component.html',
  styleUrls: ['./widgets-sales.component.scss']
})
export class WidgetsSalesComponent implements OnInit {

  constructor(private chartsData: SalesChartData) {
  }

  public mainChart: IChartProps = {};
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

}
