import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class InvoiceDetails {
    ins_InvoiceID: number = 0;
    ins_InvoiceDetailID: number = 0;
    ins_ItemCode: string = '';
    ins_ItemDescription: string = '';
    ins_LineNum: number = 0;
    ins_LineStatus: number = 0;

    ins_VatGroup: string = '';
    ins_PurchaseUom: string = '';
    ins_Quantity: number = 0;
    ins_ReceivedQuantity: number = 0;
    ins_BalanceQuantity: number = 0;

    ins_InventoryUom: string = '';
    ins_InventoryQuantity: number = 0;
    ins_ReceivedInventoryQuantity: number = 0;

    ins_PurchasePackageUom: string = '';
    ins_PurchasePackQuantity: number = 0;

    ins_UnitPrice: number = 0;
    ins_UnitCost: number = 0;
    ins_UnitCostEx: number = 0;
    ins_UnitCostInc: number = 0;

    ins_TaxAmount: number = 0;
    ins_TotalAmount: number = 0;
    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
}

export class InvoiceDetailsList {
    ins_DocNum: string = '';
    ins_PostingDate: Date;
    ins_SupplierName: string = '';
}