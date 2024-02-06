import { Component } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

import { navItems, navBranchItems, navApproverItems, navHeadOfficeItems } from './_nav';
import { Users } from 'src/_services/user.api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

  userInfo: any;
  public navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(public iconSet: IconSetService, private user: Users,) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };

    this.userInfo = this.user.getCurrentUser();
    let rolecode = this.userInfo.roleCode;
    console.log("rolecode", rolecode);

    switch (rolecode) {
      case 'BRUSR':
      case 'OMNGR':
        this.navItems = navBranchItems;
        break;
      case 'ORREL':
      case 'BRAPR':
        this.navItems = navApproverItems;
        break;
      case 'ADMFI':
        this.navItems = navHeadOfficeItems;
        break;
      default:
        this.navItems = navItems;
        break;
    }

    console.log(this.navItems);






  }
}
