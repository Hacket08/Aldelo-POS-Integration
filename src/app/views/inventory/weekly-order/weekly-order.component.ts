import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

import { WeeklyOrderService } from '../../../../_shared/weekly-order/weekly-order.service';

@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.scss']
})
export class WeeklyOrderComponent implements OnInit {
  @Output() parentData: any[] = [];


  isListViewHidden = false;
  isTransactionViewHidden = false;

  constructor(public iconSet: IconSetService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = false;
    this.isListViewHidden = true;
  }

  async eventNewTransaction(a: any) {
    this.parentData = [];

    if (a !== undefined) {
      this.parentData.push(a as any);
    }
    
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
  }

  eventListTransaction() {
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
  }
}
