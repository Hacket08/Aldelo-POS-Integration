import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  title = 'Aldelo Integration Backend Portal';
=======
  title = 'xxxxxx';
>>>>>>> 018d55a7bd2344e31dd8ff60ffbf55c85382f13b
=======
  title = 'Inspyr Employee Portal';
>>>>>>> 118de0002f24c59838f64a2025a986f0e54fb64c
=======
  title = 'Aldelo Integration Portal';
>>>>>>> 9442251d301a0c0cfe7e851b4749537e06cb99af
=======
  title = 'Aldelo Integration Portal';
>>>>>>> master

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
