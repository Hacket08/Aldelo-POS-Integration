import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UserAccount {
    ins_UserID: number = 0;
    ins_InActive: number = 0;
    ins_UseEmail: number = 0;

    ins_UserName: string = '';
    ins_FirstName: string = '';
    ins_MiddleInitial: string = '';
    ins_LastName: string = '';
    ins_SecurityLevel: string = '';
    ins_Password: string = '';
    ins_RetryPassword: string = '';
    ins_EmailAddress: string = '';
    ins_BranchCode: string = '';
    ins_BranchName: string = '';
    ins_FullName: string = '';

    ins_LastLoginDate: Date;

    ins_Badge: string = '';
    ins_BadgeName: string = '';

    ins_UserApprover: {};
}
