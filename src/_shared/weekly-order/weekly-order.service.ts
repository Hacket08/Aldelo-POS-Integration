import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../_model/purchase-order/purchase-order';
import { HttpClient } from '@angular/common/http';
import { WeeklyOrderApi } from '../weekly-order/weekly-order.api'

@Injectable({ providedIn: 'root' })
export class WeeklyOrderService {
  constructor(public weeklyorderapi: WeeklyOrderApi)
  {}

  async getList()
  {
    const sup = await this.weeklyorderapi.get_WeeklyOrder();
    return sup;
  }

  async getApprovedList()
  {
    const sup = await this.weeklyorderapi.get_WeeklyOrderByApi("GetApprovedList");
    return sup;
  }

  async getDetails(data: string)
  {
    const sup = await this.weeklyorderapi.get_WeeklyOrder_details(data);
    return sup;
  }
  
  async docApproved(id: number)
  {
    const sup = await this.weeklyorderapi.approve_WeeklyOrder(id as number);
    return sup;
  }
  
  async docRejected(id: number)
  {
    const sup = await this.weeklyorderapi.reject_WeeklyOrder(id as number);
    return sup;
  }
}
