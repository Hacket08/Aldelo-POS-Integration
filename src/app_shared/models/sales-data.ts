export class SalesData {
    constructor(
        public ins_BranchCode: string,
        public ins_BranchName: string,
        public ins_BrandName: string,
        public ins_Year: number,
        public ins_Quarter: number,
        public ins_Day: number,
        public ins_MonthId: number,
        public ins_WeekNumber: number,
        public ins_Hour: number,
        public ins_Month: string,   
        public ins_Date: any, 
        public ins_TotalAmount: number, 
        public ins_NetAmount: number, 
        public ins_TotalCount: number 
    ){}
}
