import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserSelectionComponent } from './users/user-selection/user-selection.component';
import { UserDataEntryComponent } from './users/user-data-entry/user-data-entry.component';
import { ConfigurationComponent } from './configuration/configuration.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserSelectionComponent,
    UserDataEntryComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
