import { Injectable } from '@angular/core';
import { Item } from '../../_model/item/item';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor()
  {}

  getList()
  {
    let list: Item[] = [];
    let s = new Item();
    s.itemcode = "something";
    s.itemname = "something";
    s.itemuom = "something";
    list.push(s);
    
    s = new Item();
    s.itemcode = "1";
    s.itemname = "2";
    s.itemuom = "3";
    list.push(s);

    s = new Item();
    s.itemcode = "1s";
    s.itemname = "2s";
    s.itemuom = "3s";
    list.push(s);

    return list;
  }
}
