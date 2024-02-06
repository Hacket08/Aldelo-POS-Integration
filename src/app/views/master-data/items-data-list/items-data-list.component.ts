import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';

import {
  Item
} from '../../../../_model/item/item';

@Component({
  selector: 'app-items-data-list',
  templateUrl: './items-data-list.component.html',
  styleUrls: ['./items-data-list.component.scss']
})
export class ItemsDataListComponent implements OnInit {
  @Output() itemListEvent = new EventEmitter();
  items: Item[] = [];

  constructor(
    private globalservice: GlobalService
  ) { }

  async ngOnInit(): Promise<void> {
    let data: any;
    this.items = [];

    data = (await this.globalservice.getAuthList('Item')) as any;
    // data = (await this.itemservice.getList())  as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }
  }

  PassEvent() {
    this.itemListEvent.emit();
  }

  async DataLoadEvent(e: any) {
    
    console.log(e);
    await this.itemListEvent.emit(await e);
  }
}
