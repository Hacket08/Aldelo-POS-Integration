import { Injectable } from '@angular/core';
import { InvoiceDetails } from './invoice-details';

@Injectable({
    providedIn: 'root'
})

export class Invoice {
    ins_InvoiceID: number = 0;
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
    ins_Badge: string = '';
    ins_BadgeName: string = '';

    ins_InvoiceDetails: {};
}

export class InvoiceList {
    ins_DocNum: string = '';
    ins_PostingDate: Date;
    ins_SupplierName: string = '';
}
