import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent } from './items/items.component';
import { SupplierComponent } from './supplier/supplier.component';
import { BranchComponent } from './branch/branch.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Master Data',
    },
    children: [
      {
        path: '',
        redirectTo: 'master-data',
      },
      {
        path: 'items',
        component: ItemsComponent,
        data: {
          title: 'Items',
        },
      },
      {
        path: 'branch',
        component: BranchComponent,
        data: {
          title: 'Branch',
        },
      },
      {
        path: 'supplier',
        component: SupplierComponent,
        data: {
          title: 'Supplier',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterDataRoutingModule { }
