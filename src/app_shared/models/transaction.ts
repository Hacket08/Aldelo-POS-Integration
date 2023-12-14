import { TransactionLine } from "./transaction-line";

export class Transaction {
    constructor(
        
        public ins_Id: string,
        public ins_DocNum: string,
        public ins_DocStatus: number,
        
        public ins_CardCode: string,
        public ins_CardName: string,

        public ins_PostingDate: any,
        public ins_DocDate: any,
        public ins_DueDate: any,

        public ins_Remarks: string,
        public ins_ApproverEmailList: string,

        public ins_UserId: number,
        public ins_DocTotal: number,

        public ins_ModifiedBy: string,
        public ins_CreatedBy: string,
        public ins_BranchCode: string,
        public ins_BranchName: string,

        public ins_TransactionLine: TransactionLine[]
    ) { }
}
