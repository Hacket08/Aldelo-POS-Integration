import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent implements OnInit {
  // title = 'appBootstrap';

  // model;

  constructor(public iconSet: IconSetService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {}
}
