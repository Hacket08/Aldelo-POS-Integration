import { Injectable } from '@angular/core';
// import { PurchaseOrderDetails } from '../purchase-order-details/purchase-order-details';

@Injectable({
    providedIn: 'root'
})

export class InventoryMovementLines {
    ins_InventoryMovementID: number = 0;
    ins_InventoryMovementLinesID: number = 0;

    ins_ItemCode: string = ''; 
    ins_ItemDescription: string = '';
    ins_InventoryUom: string = '';
    ins_InventoryQuantity: number = 0;

    ins_MovementType: string = '';
    ins_MovementCode: string = '';

    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';

    ins_BranchCode: string = '';
    ins_BranchName: string = '';
}
