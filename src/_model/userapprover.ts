import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserApprover {
    ins_UserID: number = 0;
    ins_ApproverUserName: string = '';
    ins_FullName: string = '';
    ins_EmailAddress: string = '';
    ins_ApprovalLevel: string = '';
}

