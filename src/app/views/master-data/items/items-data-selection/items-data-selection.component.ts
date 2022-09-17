import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../../../_shared/items/item.service';
import { Item } from '../../../../../_model/item/item';

@Component({
  selector: 'app-items-data-selection',
  templateUrl: './items-data-selection.component.html',
  styleUrls: ['./items-data-selection.component.scss']
})
export class ItemsDataSelectionComponent implements OnInit {
  @Output() itemListEvent = new EventEmitter();
  items: Item[] = [];
  
  constructor(public itemservice: ItemService) { }

  async ngOnInit(): Promise<void> {
    let data: any;
    this.items = [];

    data = (await this.itemservice.getList())  as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }

  }

  eventReadData(e: any) {
    this.itemListEvent.emit(e);
  }

  PassEvent(){
    this.itemListEvent.emit();
  }

}
