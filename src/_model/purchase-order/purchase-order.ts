import { Injectable } from '@angular/core';
import { PurchaseOrderDetails } from '../../_model/purchase-order-details/purchase-order-details';

@Injectable({
    providedIn: 'root'
})

export class PurchaseOrder {
    ins_PurchaseOrderID: number = 0;
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
    ins_BranchCode: string = '';
    ins_BranchName: string = '';

    ins_PurchaseOrderDetails: {};
}

export class PurchaseOrderList {
    ins_DocNum: string = '';
    ins_PostingDate: Date;
    ins_SupplierName: string = '';
}
