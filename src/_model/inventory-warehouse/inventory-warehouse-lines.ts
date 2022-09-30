import { Injectable } from '@angular/core';
// import { PurchaseOrderDetails } from '../purchase-order-details/purchase-order-details';

@Injectable({
    providedIn: 'root'
})

export class InventoryWarehouseLines {
    ins_InventoryWarehouseID: number = 0;
    ins_InventoryWarehouseLinesId: number = 0;

    ins_ItemCode: string = '';
    ins_ItemDescription: string = '';
    ins_InventoryUom: string = '';
    ins_ItemCategory: string = '';
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
    
    ins_InventoryType: string = '';
    ins_InventoryCode: string = '';

    ins_OnHand: number = 0;
    ins_BegCount: number = 0;
    ins_EndCount: number = 0;

    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';
}
