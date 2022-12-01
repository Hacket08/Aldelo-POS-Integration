import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SwalService } from '../../../../_services/swal-service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Users } from '../../../../_services/user.api';


import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public user_data: any = [];
  user_fullName = '';
  user_role: number = 0;

  constructor(private classToggler: ClassToggleService, public swalService: SwalService, public user: Users
    ,public iconSet: IconSetService) {
    super();
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
    
    this.user_fullName = this.user.getUserFullName();
    // console.log("this.user_fullName", this.user_fullName);
    this.user_role = this.user.getUserRole();
  }
  


  logOut() {
    this.swalService.centeredConfirm(
      this.routeOut, 
      "Logout Confirmation",
      "Are you sure to Logout?",
      "warning", false, false, true,
      "Yes, I want to logout", "No, I want to stay!"
    );
  }

  routeOut() {
    localStorage.removeItem('userData');
    location.replace('/login');
  }
}
