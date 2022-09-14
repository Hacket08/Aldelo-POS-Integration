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


import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { PurchaseRoutingModule } from './purchase-routing.module';
// import { NgbDatepicker } from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker";

//Form Declarations
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderMonitoringComponent } from './purchase-order-monitoring/purchase-order-monitoring.component';
import { PuchaseOrderListComponent } from './purchase-order/puchase-order-list/puchase-order-list.component';
import { PurchaseOrderTransactionComponent } from '../purchase/purchase-order/purchase-order-transaction/purchase-order-transaction.component';
import { ItemDataEntryComponent } from './item-data-entry/item-data-entry.component';
// import { SupplierDataEntryComponent } from './supplier-data-entry/supplier-data-entry.component';


@NgModule({
  declarations: [
    PurchaseOrderComponent,
    PurchaseOrderMonitoringComponent,
    PuchaseOrderListComponent,
    PurchaseOrderTransactionComponent,
    ItemDataEntryComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    DocsComponentsModule,
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
export class PurchaseModule { }
