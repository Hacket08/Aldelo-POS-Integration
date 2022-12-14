import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// CoreUI Modules
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';

// utils
// import { DocsComponentsModule } from '@docs-components/docs-components.module';

// views

// Components Routing
import { SalesRoutingModule } from './sales-routing.module';
import { SalesMonitoringComponent } from './sales-monitoring/sales-monitoring.component';
import { BranchSalesMonitoringComponent } from './branch-sales-monitoring/branch-sales-monitoring.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    CommonModule,
    SalesRoutingModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    SpinnerModule,
    TabsModule,
    NavModule,
    TooltipModule,
    CarouselModule,
    FormModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    WidgetsModule
    // DocsComponentsModule,
  ],
  declarations: [
  
    SalesMonitoringComponent,
    BranchSalesMonitoringComponent,
    SalesReportComponent
  ],
})
export class SalesModule { }
