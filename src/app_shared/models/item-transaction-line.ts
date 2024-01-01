import { ItemUomSelection } from "./item-uom-selection";

export class ItemTransactionLine {
   
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

        public ins_ItemUomId: number,
        
        public ins_BaseDocNum: string,
        public ins_BaseDocEntry: number,
        public ins_BaseDocType: number,
        public ins_BaseLineNum: number,
        public ins_ObjectType: number,
        
        public ins_OrderQuantity: number,
        public ins_ReceivedQuantity: number,
        public ins_ReleasedQuantity: number,
        public ins_ReleasedInventoryQuantity: number,
    ) { }
}
