import { ItemUomSelection } from "./item-uom-selection";

export class ItemTransaction {
    constructor(
        public ins_ItemCode: string,
        public ins_ItemName: string,
        public ins_Quantity: number,
        public ins_ItemUnitOfMeasurement: ItemUomSelection[],
    ) { }
}
