import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ExpensesComponent } from './expenses/expenses.component'

const routes: Routes = [  {
  path: '',
  data: {
    title: 'Other Transaction',
  },
  children: [
    {
      path: '',
      redirectTo: 'Expenses',
    },
    {
      path: 'expenses',
      component: ExpensesComponent,
      data: {
        title: 'Expenses',
      },
    },
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OthersRoutingModule { }
