import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../service/item/item-service';
import { Item } from '../../../shared/item/item';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

class POItem {
  itemcode: string = '';
  itemname: string = '';
  itemuom: string = '';
}

@Component({
  selector: 'app-purchase-order-transaction',
  templateUrl: './purchase-order-transaction.component.html',
  styleUrls: ['./purchase-order-transaction.component.scss'],
})
export class PurchaseOrderTransactionComponent implements OnInit {
  @Input() childPost: any[] = [];
  @Output() passedEvent = new EventEmitter();
  model!: NgbDateStruct;
  
  poitem: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  // toggleLiveDemo() {
  //   this.liveDemoVisible = !this.liveDemoVisible;
  // }

  // handleLiveDemoChange(event: boolean) {
  //   this.liveDemoVisible = event;
  // }

  PassEvent() {
    this.passedEvent.emit();
  }

  eventAddRow(items: any[]) {
    console.log("Data trigger from item", items);
    this.poitem.push(items);
    console.log("pos items", this.poitem);
  //   for(let item of items){
  //     console.log("Data trigger from item", item);
  //  }
  }

  numericOnly(event: any): boolean {    
    let patt = /^[0-9]+(\.[0-9]{1,2})?$/;
    let result = patt.test(event.key);
    return result;
  }

  deleteItem(i: any)
  {
    this.poitem.splice(i,1);
  }
}
