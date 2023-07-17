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
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { GoodsReceiptListComponent } from './goods-receipt/goods-receipt-list/goods-receipt-list.component';
import { GoodsReceiptTransactionComponent } from './goods-receipt/goods-receipt-transaction/goods-receipt-transaction.component';
import { PurchaseOrderSelectionComponent } from './purchase-order/purchase-order-selection/purchase-order-selection.component';

import { WidgetsModule } from '../widgets/widgets.module';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';

import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceSelectionComponent } from './invoice/invoice-selection/invoice-selection.component';
import { InvoiceTransactionComponent } from './invoice/invoice-transaction/invoice-transaction.component';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    PurchaseOrderMonitoringComponent,
    PuchaseOrderListComponent,
    PurchaseOrderTransactionComponent,
    GoodsReceiptComponent,
    GoodsReceiptListComponent,
    GoodsReceiptTransactionComponent,
    PurchaseOrderSelectionComponent,
    PurchaseReportComponent,
    InvoiceComponent,
    InvoiceListComponent,
    InvoiceSelectionComponent,
    InvoiceTransactionComponent
    // ItemDataEntryComponent
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
    WidgetsModule
    // NgbDatepicker,
  ]
})
export class PurchaseModule { }
