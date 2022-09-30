import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

@Component({
  selector: 'app-inventory-count',
  templateUrl: './inventory-count.component.html',
  styleUrls: ['./inventory-count.component.scss']
})
export class InventoryCountComponent implements OnInit {
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
