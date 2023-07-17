import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PurchaseOrderMonitoringComponent } from './purchase-order-monitoring/purchase-order-monitoring.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component'
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component'
import { PurchaseReportComponent } from './purchase-report/purchase-report.component'

import { InvoiceComponent } from './invoice/invoice.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Purchase',
    },
    children: [
      {
        path: '',
        redirectTo: 'purchase-order-monitoring',
      },
      {
        path: 'purchase-order-monitoring',
        component: PurchaseOrderMonitoringComponent,
        data: {
          title: 'Purchase Order Monitoring',
        },
      },
      {
        path: 'purchase-order',
        component: PurchaseOrderComponent,
        data: {
          title: 'Purchase Order',
        },
      },
      {
        path: 'goods-receipt',
        component: GoodsReceiptComponent,
        data: {
          title: 'Goods Receipt',
        },
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
          title: 'Invoice',
        },
      },
      {
        path: 'purchase-report',
        component: PurchaseReportComponent,
        data: {
          title: 'Report',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
