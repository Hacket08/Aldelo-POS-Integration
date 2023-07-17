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
