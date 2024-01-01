import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersTransactionComponent } from './users-transaction/users-transaction.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Administrator',
    },
    children:[
      {
        path: '',
        redirectTo: 'users',
      },
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users',
        },
      },
      {
        path: 'users-transaction',
        component: UsersTransactionComponent,
        data: {
          title: 'User Transaction',
        },
      },
      {
        path: 'users-transaction/:userid',
        component: UsersTransactionComponent,
        data: {
          title: 'User Transaction',
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
