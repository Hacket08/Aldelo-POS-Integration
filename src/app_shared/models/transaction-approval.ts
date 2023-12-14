export class TransactionApproval {
    constructor(
        public ins_Id: string,
        public ins_ApprovedUserId: number,
        public ins_DocStatus: number,
        public ins_ApprovedBy: string,
        public ins_ApprovedRemarks: string
    ){

    }
}
