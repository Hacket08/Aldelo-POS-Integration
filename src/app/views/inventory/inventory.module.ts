import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';


import { MasterDataModule } from '../master-data/master-data.module'

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
  UtilitiesModule,  
  ButtonGroupModule,
  AlertModule,
  ModalModule,
  ToastModule,
} from '@coreui/angular';

import { InventoryRoutingModule } from './inventory-routing.module';
import { WeeklyOrderComponent } from './weekly-order/weekly-order.component';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement.component';
import { WeeklyOrderListComponent } from './weekly-order/weekly-order-list/weekly-order-list.component';
import { WeeklyOrderTransactionComponent } from './weekly-order/weekly-order-transaction/weekly-order-transaction.component';
import { InventoryCountComponent } from './inventory-count/inventory-count.component';
import { InventoryCountListComponent } from './inventory-count/inventory-count-list/inventory-count-list.component';
import { InventoryCountTransactionComponent } from './inventory-count/inventory-count-transaction/inventory-count-transaction.component';
import { InventoryMovementTransactionComponent } from './inventory-movement/inventory-movement-transaction/inventory-movement-transaction.component';
import { InventoryMovementListComponent } from './inventory-movement/inventory-movement-list/inventory-movement-list.component';
import { InventoryMonitoringComponent } from './inventory-monitoring/inventory-monitoring.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
// import { ItempDataFilterComponent } from '../master-data/items/itemp-data-filter/itemp-data-filter.component';

@NgModule({
  declarations: [
    WeeklyOrderComponent,
    InventoryMovementComponent,
    WeeklyOrderListComponent,
    WeeklyOrderTransactionComponent,
    InventoryCountComponent,
    InventoryCountListComponent,
    InventoryCountTransactionComponent,
    InventoryMovementTransactionComponent,
    InventoryMovementListComponent,
    InventoryMonitoringComponent,
    InventoryReportComponent,
    // ItempDataFilterComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    AccordionModule,
    CardModule,
    FormModule,
    GridModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    DropdownModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    TableModule,
    BadgeModule,
    ModalModule,
    MasterDataModule,
    // NgbDatepicker,
  ]
})
export class InventoryModule { }
