import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../_model/purchase-order/purchase-order';
import { HttpClient } from '@angular/common/http';
import { InventoryWarehouseApi } from '../inventory-warehouse/inventory-warehouse.api'

@Injectable({ providedIn: 'root' })
export class InventoryWarehouseService {
  constructor(public inventorywarehouseapi: InventoryWarehouseApi)
  {}

  async getList()
  {
    const sup = await this.inventorywarehouseapi.get_InventoryWarehouse();
    return sup;
  }

  async getApprovedList()
  {
    const sup = await this.inventorywarehouseapi.get_InventoryWarehouseByApi("GetApprovedList");
    return sup;
  }

  async getDetails(data: string)
  {
    const sup = await this.inventorywarehouseapi.get_InventoryWarehouse_details(data);
    return sup;
  }
  
  async docApproved(id: number)
  {
    const sup = await this.inventorywarehouseapi.approve_InventoryWarehouse(id as number);
    return sup;
  }
  
  async docRejected(id: number)
  {
    const sup = await this.inventorywarehouseapi.reject_InventoryWarehouse(id as number);
    return sup;
  }

}
