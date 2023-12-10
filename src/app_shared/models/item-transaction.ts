import { ItemUomSelection } from "./item-uom-selection";

export class ItemTransaction {
    constructor(
        public ins_ItemCode: string,
        public ins_ItemName: string,
        public ins_ItemUnitOfMeasurement: ItemUomSelection[],
        
        public ins_UnitUom: string,
        public ins_UnitQuantity: number,
        public ins_UnitCost: number,
        public ins_LineTotal: number,

        public ins_InventoryUom: number,
        public ins_InventoryQuantity: number,
        public ins_InventoryCost: number,

        public ins_UnitBaseUom: string,
        public ins_UnitBaseQuantity: number,
        public ins_UnitBaseCost: number,
    ) { }
}
