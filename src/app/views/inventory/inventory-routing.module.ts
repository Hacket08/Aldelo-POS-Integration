import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WeeklyOrderComponent } from './weekly-order/weekly-order.component';
import { InventoryCountComponent } from './inventory-count/inventory-count.component';

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
        path: 'weekly-order',
        component: WeeklyOrderComponent,
        data: {
          title: 'Weekly Order',
        },
      },
      {
        path: 'inventory-count',
        component: InventoryCountComponent,
        data: {
          title: 'Inventory Count',
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
