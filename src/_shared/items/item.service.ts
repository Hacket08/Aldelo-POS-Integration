import { Injectable } from '@angular/core';
import { Item } from '../../_model/item/item';
import { HttpClient } from '@angular/common/http';
import { ItemApi } from '../../_shared/items/item.api'

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(public itemapi: ItemApi)
  {}

  async getList()
  {
    const sup = await this.itemapi.get_item();
    return sup;
  }

  async getDetails(data: string)
  {
    const sup = await this.itemapi.get_item_details(data);
    return sup;
  }
}
