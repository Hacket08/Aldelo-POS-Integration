import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WeeklyOrderService } from '../../../../../_shared/weekly-order/weekly-order.service';
import { WeeklyOrder } from '../../../../../_model/weekly-order/weekly-order';

@Component({
  selector: 'app-weekly-order-list',
  templateUrl: './weekly-order-list.component.html',
  styleUrls: ['./weekly-order-list.component.scss']
})

export class WeeklyOrderListComponent implements OnInit {
  @Output() weeklyOrderEvent = new EventEmitter();
  weeklyorder: WeeklyOrder[] = [];

  constructor(public weeklyorderservice: WeeklyOrderService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.weeklyorder = [];

    data = (await this.weeklyorderservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {
        switch (val.ins_DocStatus) {
          case 0: // Pending
            val.ins_Badge = 'warning';
            val.ins_BadgeName = 'PENDING';
            break;
          case 1: // Approved
            val.ins_Badge = 'success';
            val.ins_BadgeName = 'APPROVED';
            break;
          case 2: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'REJECTED';
            break;
          case 3: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'CLOSED';
            break;
          default:
            break;
        }

        console.log(val);
        this.weeklyorder.push(val);
      }
    }
  }

  PassEvent() {
    this.weeklyOrderEvent.emit();
  }

  async DataLoadEvent(e: any) {
    console.log('Weekly Order List Selection', e);
    await this.weeklyOrderEvent.emit(await e);
  }
}
