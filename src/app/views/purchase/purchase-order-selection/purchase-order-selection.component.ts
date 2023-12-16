import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { PurchaseOrder } from 'src/_model/purchase-order/purchase-order';

@Component({
  selector: 'app-purchase-order-selection',
  templateUrl: './purchase-order-selection.component.html',
  styleUrls: ['./purchase-order-selection.component.scss'],
})
export class PurchaseOrderSelectionComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter();

  dataList: PurchaseOrder[] = [];

  constructor(private globalservice: GlobalService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];
    data = (await this.globalservice.getAuthList('PurchaseOrders/GetApprovedList')) as any;
    if (data !== false) {
      for (var a of data) {
        this.dataList.push(a);
      }
    }
  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }
}
