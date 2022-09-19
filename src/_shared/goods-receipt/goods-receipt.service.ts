import { Injectable } from '@angular/core';
import { GoodsReceipt } from '../../_model/goods-receipt/goods-receipt';
import { HttpClient } from '@angular/common/http';
import { GoodsReceiptApi } from '../goods-receipt/goods-receipt.api'

@Injectable({ providedIn: 'root' })
export class GoodsReceiptService {
  constructor(public GoodsReceiptapi: GoodsReceiptApi)
  {}

  async getList()
  {
    const sup = await this.GoodsReceiptapi.get_GoodsReceipt();
    return sup;
  }

  async getDetails(data: string)
  {
    const sup = await this.GoodsReceiptapi.get_GoodsReceipt_details(data);
    return sup;
  }
}
