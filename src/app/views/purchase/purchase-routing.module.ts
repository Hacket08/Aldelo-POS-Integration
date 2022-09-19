import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PurchaseOrderMonitoringComponent } from './purchase-order-monitoring/purchase-order-monitoring.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component'
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component'


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
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
