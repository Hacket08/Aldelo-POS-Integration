import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  ListGroupModule,
  WidgetModule, 
  TableModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';


import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from './widgets-brand/widgets-brand.component';
import { ChartSample, WidgetsDropdownComponent } from './widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from './widgets-e/widgets-e.component';
import { WidgetsSalesComponent } from './widgets-sales/widgets-sales.component';
import { WidgetSalesDashboardComponent } from './widget-sales-dashboard/widget-sales-dashboard.component';
import { WidgetsPurchaseComponent } from './widgets-purchase/widgets-purchase.component';
import { WidgetsBranchDataMonitoringComponent } from './widgets-branch-data-monitoring/widgets-branch-data-monitoring.component';



@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    ChartSample,
    WidgetsEComponent,
    WidgetsSalesComponent,
    WidgetSalesDashboardComponent,
    WidgetsPurchaseComponent,
    WidgetsBranchDataMonitoringComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    DocsComponentsModule,
    ProgressModule,
    ListGroupModule,
    ChartjsModule,
    TableModule
  ],
  exports: [
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    WidgetsSalesComponent,
    WidgetSalesDashboardComponent,
    WidgetsPurchaseComponent,
    WidgetsBranchDataMonitoringComponent
  ]
})
export class WidgetsModule {
}
