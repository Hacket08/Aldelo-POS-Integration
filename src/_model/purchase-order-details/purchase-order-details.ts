import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PurchaseOrderDetails {
    ins_ItemCode: string = '';
    ins_ItemDescription: string = '';
    ins_LineNum: number = 0;
    ins_LineStatus: number = 0;

    ins_VatGroup: string = '';
    ins_PurchaseUom: string = '';
    ins_Quantity: number = 0;

    ins_InventoryUom: string = '';
    ins_InventoryQuantity: number = 0;

    ins_PurchasePackageQuantity: number = 0;

    ins_UnitCost: number = 0;
    ins_UnitCostEx: number = 0;
    ins_UnitCostInc: number = 0;

    ins_TaxAmount: number = 0;
    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';
    ins_CreateDate: Date;
    ins_ModifiedDate: Date;
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
}

export class PurchaseOrderDetailsList {
    ins_DocNum: string = '';
    ins_PostingDate: Date;
    ins_SupplierName: string = '';
}
