import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { BnNgIdleService } from 'bn-ng-idle';
import { Constants } from '../_config/constant';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'CODEIT : Online Portal Solution';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private bnIdle: BnNgIdleService,
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    //60 = 1 minute
    
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (res) {
        console.log('session expired');
        localStorage.removeItem('userData');
        localStorage.removeItem('userApprover');
        this.router.navigate(['/login']);
      }
    });

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
