import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { ExpensesComponent } from './expenses/expenses.component';


@NgModule({
  declarations: [
    ExpensesComponent
  ],
  imports: [
    CommonModule,
    OthersRoutingModule
  ]
})
export class OthersModule { }
