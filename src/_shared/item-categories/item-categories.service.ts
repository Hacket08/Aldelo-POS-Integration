import { Injectable } from '@angular/core';
import { ItemCategories } from '../../_model/item-categories/item-categories';
import { HttpClient } from '@angular/common/http';
import { ItemCategoriesApi } from '../item-categories/item-categories.api'

@Injectable({ providedIn: 'root' })
export class ItemCategoriesService {
  constructor(public itemcategoriesapi: ItemCategoriesApi)
  {}

  async getList()
  {
    const sup = await this.itemcategoriesapi.get_item();
    return sup;
  }

  async getDetails(data: string)
  {
    const sup = await this.itemcategoriesapi.get_item_details(data);
    return sup;
  }
}
