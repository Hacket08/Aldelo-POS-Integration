import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { WeeklyOrderComponent } from './weekly-order/weekly-order.component';
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
