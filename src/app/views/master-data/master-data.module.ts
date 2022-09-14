import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { ItemsComponent } from './items/items.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierDataListComponent } from './supplier/supplier-data-list/supplier-data-list.component';
import { SupplierDataEntryComponent } from './supplier/supplier-data-entry/supplier-data-entry.component';


@NgModule({
  declarations: [
    ItemsComponent,
    SupplierComponent,
    SupplierDataListComponent,
    SupplierDataEntryComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule
  ]
})
export class MasterDataModule { }
