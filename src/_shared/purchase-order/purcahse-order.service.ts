import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../_model/purchase-order/purchase-order';
import { HttpClient } from '@angular/common/http';
import { PurchaseOrderApi } from '../purchase-order/purchase-order.api'

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  constructor(public PurchaseOrderapi: PurchaseOrderApi)
  {}

  async getList()
  {
    const sup = await this.PurchaseOrderapi.get_PurchaseOrder();
    return sup;
  }

  async getApprovedList()
  {
    const sup = await this.PurchaseOrderapi.get_PurchaseOrderByApi("GetApprovedList");
    return sup;
  }

  async getDetails(data: string)
  {
    const sup = await this.PurchaseOrderapi.get_PurchaseOrder_details(data);
    return sup;
  }
  
  async docApproved(id: number)
  {
    const sup = await this.PurchaseOrderapi.approve_PurchaseOrder(id as number);
    return sup;
  }
  
  async docRejected(id: number)
  {
    const sup = await this.PurchaseOrderapi.reject_PurchaseOrder(id as number);
    return sup;
  }
}
