import { Injectable } from '@angular/core';
import { Item } from '../../_model/item/item';
import { HttpClient } from '@angular/common/http';
import { ItemApi } from '../../_shared/items/item.api'
import { GlobalService } from 'src/_shared/api/service';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(public itemapi: ItemApi, private globalservice: GlobalService)
  {}

  async getList()
  {
    const sup = await this.itemapi.get_item();
    return sup;
  }

  async getDetails(data: string)
  {
    let output: any;
    output = (await this.globalservice.getAuthList('Item')) as any;


    
    const sup = await this.itemapi.get_item_details(data);
    return sup;
  }
}
