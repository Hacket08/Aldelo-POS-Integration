import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Supplier {
    ins_SupplierCode: string = '';
    ins_SupplierName: string = '';
    ins_ContactPerson: string = '';
    ins_Position: string = '';
    ins_Address1: string = '';
    ins_Address2: string = '';
    ins_Address3: string = '';
    ins_Phone: string = '';
    ins_EmailAddress: string = '';
    ins_InActive: number = 0;
}
