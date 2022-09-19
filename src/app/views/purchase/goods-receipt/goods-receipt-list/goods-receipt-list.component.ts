import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GoodsReceiptService } from '../../../../../_shared/goods-receipt/goods-receipt.service';
import { GoodsReceipt } from '../../../../../_model/goods-receipt/goods-receipt';

@Component({
  selector: 'app-goods-receipt-list',
  templateUrl: './goods-receipt-list.component.html',
  styleUrls: ['./goods-receipt-list.component.scss'],
})
export class GoodsReceiptListComponent implements OnInit {
  @Output() goodsReceiptEvent = new EventEmitter();
  goodsreceipts: GoodsReceipt[] = [];

  constructor(public goodsreceiptservice: GoodsReceiptService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.goodsreceipts = [];

    data = (await this.goodsreceiptservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {
        // console.log(val.ins_DeliveryDate);
        this.goodsreceipts.push(val);
      }
    }
  }

  PassEvent(){
    this.goodsReceiptEvent.emit();
  }
  
  async DataLoadEvent(e: any) {
    await this.goodsReceiptEvent.emit(await e);
  }
  
}
