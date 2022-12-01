import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Branch {
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
    ins_Address: string = '';
    ins_City: string = '';
    ins_Area: string = '';
    ins_InActive: number = 0;

    ins_RegisterNumber: string = '';
    ins_ActivationNumber: string = '';
    ins_HardwareKey: string = '';
    ins_Remarks: string = '';

    ins_ModifiedBy: string = '';
    ins_CreatedBy: string = '';
    ins_Badge: string = '';
    ins_BadgeName: string = '';
}
