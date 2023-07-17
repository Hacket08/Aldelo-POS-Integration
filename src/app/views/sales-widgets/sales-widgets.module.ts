import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@coreui/icons-angular';

import { SalesWidgetsRoutingModule } from './sales-widgets-routing.module';
import { WidgetsDashboardComponent } from './widgets-dashboard/widgets-dashboard.component';

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
  WidgetModule,
} from '@coreui/angular';


@NgModule({
  declarations: [
    WidgetsDashboardComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
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
    WidgetModule,
    ProgressModule,
    SalesWidgetsRoutingModule
  ],
  exports: [
    WidgetsDashboardComponent
  ]
})
export class SalesWidgetsModule { }
