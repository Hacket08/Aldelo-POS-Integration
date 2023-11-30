import { Injectable } from '@angular/core';
// import { PurchaseOrderDetails } from '../purchase-order-details/purchase-order-details';

@Injectable({
    providedIn: 'root'
})

export class ItemWarehouse {
    ins_ItemCode: string = '';
    ins_ItemDescription: string = '';
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
    ins_BegInv: number = 0;
    ins_OnHand: number = 0;
    ins_RecQty: number = 0;
    ins_UsedQty: number = 0;
    ins_InvInQty: number = 0;
    ins_InvOutQty: number = 0;
    ins_CurrQty: number = 0;
    ins_Price: number = 0;
}
