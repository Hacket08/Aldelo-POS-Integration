import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PurchaseOrderService } from '../../../../../_shared/purchase-order/purcahse-order.service';
import { PurchaseOrder } from '../../../../../_model/purchase-order/purchase-order';

@Component({
  selector: 'app-puchase-order-list',
  templateUrl: './puchase-order-list.component.html',
  styleUrls: ['./puchase-order-list.component.scss'],
})
export class PuchaseOrderListComponent implements OnInit {
  @Output() purchaseOrderEvent = new EventEmitter();
  purchaseorders: PurchaseOrder[] = [];

  constructor(public purchaseorderservice: PurchaseOrderService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.purchaseorders = [];

    data = (await this.purchaseorderservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {

        switch (val.ins_DocStatus) {
          case 0: // Pending
            val.ins_Badge = 'warning';
            val.ins_BadgeName = "PENDING"
            break;
          case 1: // Approved
            val.ins_Badge = 'success';
            val.ins_BadgeName = "APPROVED"
            break;
          case 2: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = "REJECTED"
            break;
          default:
            break;
        }

        console.log(val);
        this.purchaseorders.push(val);
      }
    }
  }

  PassEvent() {
    this.purchaseOrderEvent.emit();
  }

  async DataLoadEvent(e: any) {
    console.log("Purchase List Selection", e);
    await this.purchaseOrderEvent.emit(await e);
  }
}
