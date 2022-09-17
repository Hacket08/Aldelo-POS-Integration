import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PurchaseOrder {
    ins_DocNum: string = '';
    ins_PostingDate: Date;
    ins_DeliveryDate: Date;
    ins_SupplierCode: string = '';
    ins_SupplierName: string = '';
    ins_Received: number = 0;
    ins_DocStatus: number = 0;
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
}

export class PurchaseOrderList {
    ins_DocNum: string = '';
    ins_PostingDate: Date;
    ins_SupplierName: string = '';
}
