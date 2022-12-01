import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

import {
  Supplier,
  SupplierList,
} from '../../../../_model/supplier/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  @Output() parentData: any[] = [];
  isListViewHidden = true;
  isTransactionViewHidden = true;


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
