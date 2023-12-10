export class ItemSelection {
    constructor(
        public ins_ItemCode: string,
        public ins_ItemName: string,
        public ins_FrgnName: string,
        public ins_LongName: string,
        public ins_Barcode: string,
        
        public ins_InventoryCost: number = 0.00,
        public ins_UnitPrice: number = 0.00,
        public ins_PurchasePrice: number = 0.00,
        public ins_PurchaseUom: string,
        public ins_SalesUom: string,
        public ins_InventoryUom: string,
    ){
        
    }
}