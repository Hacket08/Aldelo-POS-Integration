import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

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
} from '@coreui/angular';


import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { PurchaseRoutingModule } from './purchase-routing.module';

//Form Declarations
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { PurchaseOrderMonitoringComponent } from './purchase-order-monitoring/purchase-order-monitoring.component';
import { PuchaseOrderListComponent } from './puchase-order-list/puchase-order-list.component';
import { PurchaseOrderTransactionComponent } from './purchase-order-transaction/purchase-order-transaction.component';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    PurchaseOrderMonitoringComponent,
    PuchaseOrderListComponent,
    PurchaseOrderTransactionComponent
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
  ]
})
export class PurchaseModule { }
