import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss'],
})
export class PurchaseOrderComponent implements OnInit {

  public liveDemoVisible = false;
  isHidden = false;
  isListViewHidden = false;
  isTransactionViewHidden = false;

  constructor(public iconSet: IconSetService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = true;
  }

  toggleLiveDemo() {
    this.liveDemoVisible = !this.liveDemoVisible;
  }

  handleLiveDemoChange(event: boolean) {
    this.liveDemoVisible = event;
  }
  
  eventNewTransaction()
  {
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
  }

  eventSaveTransaction()
  {
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
    console.log("Child Event Triggered");
  }
}
