import { Injectable } from '@angular/core';
// import { PurchaseOrderDetails } from '../purchase-order-details/purchase-order-details';

@Injectable({
    providedIn: 'root'
})

export class WeeklyOrder {
    ins_WeeklyOrderID: number = 0;
    ins_DocNum: string = '';

    ins_PostingDate: Date;
    ins_DeliveryDate: Date;
    ins_OrderDate: Date;

    ins_OrderBy: string = '';
    ins_ReceiveBy: string = '';
    ins_DeliverBy: string = '';
    ins_Remarks: string = '';
       
    ins_DocStatus: number = 0;
    ins_IsPOCreated: number = 0;
    ins_ApprovedOn: Date;
    ins_ApprovedBy: string = '';
    ins_ApproverEmailList: string = '';
    ins_InternalNumber: string = '';
    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';
    ins_CreateDate: Date;
    ins_ModifiedDate: Date;
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
    ins_Badge: string = '';
    ins_BadgeName: string = '';

    
    ins_WeeklyOrderDetails: {};
}
