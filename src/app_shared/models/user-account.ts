import { UserSupplier } from "./user-supplier";
import { UserBranch } from "./user-branch";

export class UserAccount {
    constructor(
        public ins_UserAccountID: string,
        public ins_InActive: number,
        public ins_UserName: string,
        public ins_FirstName: string,
        public ins_MiddleInitial: string,
        public ins_LastName: string,
        public ins_FullName: string,
        public ins_SecurityLevel: string,
        public ins_Password: string,
        public ins_RetryPassword: string,
        public ins_EmailAddress: string,
        public ins_BranchCode: string,
        public ins_BranchName: string,
        public ins_RoleCode: string,
        public ins_RoleName: string,
        
        public ins_AllowAllSupplier: number,
        public ins_AllowAllBranch: number,

        public ins_UserSupplier: UserSupplier[],
        public ins_UserBranch: UserBranch[]
    ){}
}
