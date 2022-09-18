import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { PurchaseOrderService } from '../../../../_shared/purchase-order/purcahse-order.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent implements OnInit {
  @Output() purchaseOrderParentData: any[] = [];


  isListViewHidden = false;
  isTransactionViewHidden = false;

  constructor(public iconSet: IconSetService, public purchaseorderservice: PurchaseOrderService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = true;
    this.isListViewHidden = false;
  }

  async eventNewTransaction(a: any) {
    this.purchaseOrderParentData = [];

    if (a !== undefined) {
      const data = await this.purchaseorderservice.getDetails(a.ins_DocNum);
      for (var val of data as any) {
        this.purchaseOrderParentData.push(val as any);
      }
    }
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
  }

  eventListTransaction() {
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
  }
}
