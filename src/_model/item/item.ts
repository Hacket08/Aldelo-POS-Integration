import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Item{

    ins_ItemCode: string = '';
    ins_ItemName: string = '';
    ins_FrgnName: string = '';
    ins_LongName: string = '';
    ins_Barcode: string = '';
    ins_VatGroup: string = '';
    ins_ItemType: string = '';
    ins_ItemGroup: string = '';
    ins_ItemCategory: string = '';
    ins_PurchaseItem: number = 0;
    ins_SalesItem: number = 0;
    ins_InventoryItem: number = 0;
    
    ins_PurchaseUom: string = '';
    ins_SalesUom: string = '';
    ins_InventoryUom: string = '';
    ins_NumInPurchase: number  = 0.00;
    ins_NumInSales: number  = 0.00;
    ins_NumInInventory: number  = 0.00;

    ins_PurchasePackageUom: string = '';
    ins_SalesPackageUom: string = '';
    ins_InventoryPackageUom: string = '';
    ins_PurchasePackQuantity: number  = 0.00;
    ins_SalesPackQuantity: number  = 0.00;
    ins_InventoryPackQuantity: number  = 0.00;


    ins_DefaultWhs: string = '';
    ins_OnHand: number  = 0.00;
    ins_IsCommited: number  = 0.00;
    ins_OnOrder: number  = 0.00;
    ins_UnitPrice: number  = 0.00;
    ins_PurchasePrice: number  = 0.00;
    ins_InActive: number = 0;
}
