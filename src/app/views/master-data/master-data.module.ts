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
  AlertModule,
  ModalModule,
  ToastModule,
} from '@coreui/angular';


import { DocsComponentsModule } from '@docs-components/docs-components.module';

//Form Declarations
import { MasterDataRoutingModule } from './master-data-routing.module';
import { ItemsComponent } from './items/items.component';
import { SupplierComponent } from './supplier/supplier.component';

import { SupplierDataEntryComponent } from './supplier/supplier-data-entry/supplier-data-entry.component';
import { SupplierDataListComponent } from './supplier/supplier-data-list/supplier-data-list.component';
import { SupplierDataSelectionComponent } from './supplier/supplier-data-selection/supplier-data-selection.component';

import { ItemsDataEntryComponent } from './items/items-data-entry/items-data-entry.component';
import { ItemsDataListComponent } from './items/items-data-list/items-data-list.component';
import { ItemsDataSelectionComponent } from './items/items-data-selection/items-data-selection.component';
import { ItempDataFilterComponent } from './items/itemp-data-filter/itemp-data-filter.component';
import { BranchComponent } from './branch/branch.component';
import { BranchTransactionComponent } from './branch/branch-transaction/branch-transaction.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { BranchDataSelectionComponent } from './branch/branch-data-selection/branch-data-selection.component';
import { ItemRecipeComponent } from './item-recipe/item-recipe.component';


@NgModule({
  declarations: [
    ItemsComponent,
    SupplierComponent,
    SupplierDataEntryComponent,
    SupplierDataListComponent,
    SupplierDataSelectionComponent,
    ItemsDataEntryComponent,
    ItemsDataListComponent,
    ItemsDataSelectionComponent,
    ItempDataFilterComponent,
    BranchComponent,
    BranchTransactionComponent,
    BranchListComponent,
    BranchDataSelectionComponent,
    ItemRecipeComponent
  ],
  imports: [
    CommonModule,
    MasterDataRoutingModule,
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
  ],
  exports: [
    BranchDataSelectionComponent,
    SupplierDataSelectionComponent,
    ItemsDataSelectionComponent
  ]
})



export class MasterDataModule { }
