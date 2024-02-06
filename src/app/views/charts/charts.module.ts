import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule, CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { ChartsComponent } from './charts.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { SalesDataChartsComponent } from './sales-data-charts/sales-data-charts.component';
import { DailySalesDataChartsComponent } from './daily-sales-data-charts/daily-sales-data-charts.component';

@NgModule({
  declarations: [ChartsComponent, SalesDataChartsComponent, DailySalesDataChartsComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ChartjsModule,
    CardModule,
    GridModule,
    BadgeModule,
    DocsComponentsModule
  ],
  exports: [
    SalesDataChartsComponent,
    DailySalesDataChartsComponent,
  ]
})
export class ChartsModule {
}
