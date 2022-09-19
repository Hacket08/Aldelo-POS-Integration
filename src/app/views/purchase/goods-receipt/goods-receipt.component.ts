import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { GoodsReceiptService } from '../../../../_shared/goods-receipt/goods-receipt.service';

@Component({
  selector: 'app-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.scss']
})
export class GoodsReceiptComponent implements OnInit {
  @Output() goodsReceiptParentData: any[] = [];

  isListViewHidden = true;
  isTransactionViewHidden = true;

  constructor(public iconSet: IconSetService, public goodsreceiptservice: GoodsReceiptService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = false;
    this.isListViewHidden = true;
  }

  async eventNewTransaction(a: any) {
    this.goodsReceiptParentData = [];

    if (a !== undefined) {
      const data = await this.goodsreceiptservice.getDetails(a.ins_DocNum);
      for (var val of data as any) {
        this.goodsReceiptParentData.push(val as any);
      }
    }
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
  }

  eventListTransaction() {
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
  }
}
