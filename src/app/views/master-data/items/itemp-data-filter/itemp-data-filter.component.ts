import { Component } from '@angular/core';
import { ItemService } from '../../../../../_shared/items/item.service';

import {
  Item
} from '../../../../../_model/item/item';

// import { Injectable } from '@angular/core';
// @Injectable({
//   providedIn: 'root'
// })

@Component({
  selector: 'app-itemp-data-filter',
  templateUrl: './itemp-data-filter.component.html',
  styleUrls: ['./itemp-data-filter.component.scss']
})
export class ItempDataFilterComponent{
  items: Item[] = [];

  constructor(
    private itemservice: ItemService) { }

   ItemPerCategories(category: string): any[] {
    let data: any;
    this.items = [];
    data = (this.itemservice.getList())  as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }

    return this.items.filter(p => p.ins_ItemCategory == category);
  }

  findNonAdults(): any[] {
    return this.items.filter(p => p.ins_ItemCategory == "category");
  }
}