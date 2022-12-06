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
import { AdministrationRoutingModule } from './administration-routing.module';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersTransactionComponent } from './users/users-transaction/users-transaction.component';
import { ModuleComponent } from './module/module.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleTransactionComponent } from './module/module-transaction/module-transaction.component';
import { UsersSelectionComponent } from './users/users-selection/users-selection.component';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersTransactionComponent,
    ModuleComponent,
    ModuleListComponent,
    ModuleTransactionComponent,
    UsersSelectionComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
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
  ]
})
export class AdministrationModule { }
