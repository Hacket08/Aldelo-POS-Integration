export class ItemUomSelection {
    constructor(
        public ins_ItemCode: string,
        public ins_ItemName: string,
        public ins_BaseUOM: string,
        public ins_BaseQuantity: number,
        public ins_InventoryUOM: string,
        public ins_InventoryQuantity: number,
        public ins_UnitBaseQuantity: number,
        public ins_InActive: number
    ){

    }
}
