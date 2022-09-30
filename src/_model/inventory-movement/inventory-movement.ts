import { Injectable } from '@angular/core';
// import { PurchaseOrderDetails } from '../purchase-order-details/purchase-order-details';

@Injectable({
    providedIn: 'root'
})

export class InventoryMovement {
    ins_InventoryMovementID: number = 0;
    ins_DocNum: string = '';
    ins_PostingDate: Date;
    ins_DocStatus: number = 0;
    ins_Remarks: string = '';

    ins_MovementType: string = '';
    ins_MovementCode: string = '';

    ins_ApprovedBy: string = '';
    ins_ApproverEmailList: string = '';

    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';

    ins_BranchCode: string = '';
    ins_BranchName: string = '';

    ins_Badge: string = '';
    ins_BadgeName: string = '';

    ins_InventoryMovementLines: {};
}
