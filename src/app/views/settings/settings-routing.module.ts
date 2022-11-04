import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component'
import { ConfigurationComponent } from './configuration/configuration.component'


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings',
    },
    children: [
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
        path: 'configuration',
        component: ConfigurationComponent,
        data: {
          title: 'Configuration',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
