import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WeeklyOrderComponent } from './weekly-order/weekly-order.component';
import { InventoryCountComponent } from './inventory-count/inventory-count.component';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement.component';
import { InventoryMonitoringComponent } from './inventory-monitoring/inventory-monitoring.component';
import { InventoryReportComponent } from './inventory-report/inventory-report.component';
import { InventoryLevelReportComponent } from './inventory-level-report/inventory-level-report.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Inventory',
    },
    children: [
      {
        path: '',
        redirectTo: 'weekly-order',
      },
      {
        path: 'inventory-monitoring',
        component: InventoryMonitoringComponent,
        data: {
          title: 'Inventory Monitoring',
        },
      },
      {
        path: 'weekly-order',
        component: WeeklyOrderComponent,
        data: {
          title: 'Weekly Order',
        },
      },
      {
        path: 'inventory-movement',
        component: InventoryMovementComponent,
        data: {
          title: 'Inventory Movement',
        },
      },
      {
        path: 'inventory-count',
        component: InventoryCountComponent,
        data: {
          title: 'Inventory Count',
        },
      },
      {
        path: 'inventory-level-report',
        component: InventoryLevelReportComponent,
        data: {
          title: 'Inventory Level Report',
        },
      },
      {
        path: 'inventory-report',
        component: InventoryReportComponent,
        data: {
          title: 'Report',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
