import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../../_shared/item/item.service';
import { Item } from '../../../../_model/item/item';

@Component({
  selector: 'app-item-data-entry',
  templateUrl: './item-data-entry.component.html',
  styleUrls: ['./item-data-entry.component.scss']
})
export class ItemDataEntryComponent implements OnInit {
  
  @Output() passedEvent= new EventEmitter();

  constructor(public itemservice: ItemService
  ) { }

  item = new Item();
  items: Item[] = [];

  ngOnInit(): void {
    for(let child of this.itemservice.getList()){
      this.items.push(child)
   }
  }

  eventReadData(e: any) {
    this.passedEvent.emit(e);
  }

  PassEvent(){
    this.passedEvent.emit();
  }
}

