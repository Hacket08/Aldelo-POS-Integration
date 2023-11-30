import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../_model/purchase-order/purchase-order';
import { HttpClient } from '@angular/common/http';
import { InventoryCountApi } from './inventory-count.api';

@Injectable({ providedIn: 'root' })
export class InventoryCountService {
  constructor(public inventorycountapi: InventoryCountApi)
  {}

  async getList()
  {
    const sup = await this.inventorycountapi.get_InventoryCount();
    return sup;
  }

  async getApprovedList()
  {
    const sup = await this.inventorycountapi.get_InventoryCountByApi("GetApprovedList");
    return sup;
  }

  async getDetails(data: string)
  {
    const sup = await this.inventorycountapi.get_InventoryCount_details(data);
    return sup;
  }
  
  async docApproved(id: number)
  {
    const sup = await this.inventorycountapi.approve_InventoryCount(id as number);
    return sup;
  }
  
  async docRejected(id: number)
  {
    const sup = await this.inventorycountapi.reject_InventoryCount(id as number);
    return sup;
  }

}
