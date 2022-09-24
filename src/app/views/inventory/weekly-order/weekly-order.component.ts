import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

import { WeeklyOrderService } from '../../../../_shared/weekly-order/weekly-order.service';

@Component({
  selector: 'app-weekly-order',
  templateUrl: './weekly-order.component.html',
  styleUrls: ['./weekly-order.component.scss']
})
export class WeeklyOrderComponent implements OnInit {
  @Output() weeklyOrderParentData: any[] = [];

  isListViewHidden = true;
  isTransactionViewHidden = true;

  constructor(public iconSet: IconSetService, public weeklyorderservice: WeeklyOrderService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = false;
    this.isListViewHidden = true;
  }

  async eventNewTransaction(a: any) {
    this.weeklyOrderParentData = [];

    if (a !== undefined) {
      this.weeklyOrderParentData.push(a as any);
    }
    
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
  }

  eventListTransaction() {
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
  }
}
