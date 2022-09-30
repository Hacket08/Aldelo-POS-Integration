import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class WeeklyOrderDetails {
    
    ins_ParentId: number = 0;
    ins_Id: number = 0;
    ins_WeeklyOrderID: number = 0;
    ins_WeeklyOrderDetailsID: number = 0;


    ins_ItemCode: string = '';
    ins_ItemDescription: string = '';
    ins_InventoryUom: string = '';
    ins_ItemCategory: string = '';
    
    ins_OnHand: number = 0;
    ins_OnOrder: number = 0;
    ins_OnDelivery: number = 0;
    ins_OnActual: number = 0;

    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
}
