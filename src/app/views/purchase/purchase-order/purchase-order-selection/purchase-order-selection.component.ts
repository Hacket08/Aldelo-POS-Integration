import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PurchaseOrderService } from '../../../../../_shared/purchase-order/purcahse-order.service';
import { PurchaseOrder } from '../../../../../_model/purchase-order/purchase-order';

@Component({
  selector: 'app-purchase-order-selection',
  templateUrl: './purchase-order-selection.component.html',
  styleUrls: ['./purchase-order-selection.component.scss'],
})
export class PurchaseOrderSelectionComponent implements OnInit {
  @Output() purchaseorderSelectionEvent = new EventEmitter();

  purchaseorders: PurchaseOrder[] = [];

  constructor(public purchaseorderservice: PurchaseOrderService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.purchaseorders = [];

    data = (await this.purchaseorderservice.getList()) as any;
    if (data !== false) {
      for (var a of data) {
        this.purchaseorders.push(a);
      }
    }
  }

  purchaseOrderSelectEvent(e: any) {
    console.log(e)
    this.purchaseorderSelectionEvent.emit(e);
  }

}
