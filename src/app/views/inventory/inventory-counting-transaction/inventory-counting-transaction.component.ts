import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { ItemUomSelection } from "src/app_shared/models/item-uom-selection";
import { ItemTransaction } from "src/app_shared/models/item-transaction";
import { EventService } from "src/app_shared/services/EventService";

@Component({
  selector: 'app-inventory-counting-transaction',
  templateUrl: './inventory-counting-transaction.component.html',
  styleUrls: ['./inventory-counting-transaction.component.scss']
})
export class InventoryCountingTransactionComponent implements OnInit {

  documentForm = new FormGroup({
    docnum: new FormControl(''),
    branchcode: new FormControl('')
  });
  

  itemUOM!: ItemUomSelection[];
  itemTransactions: ItemTransaction[];
  lastAddedIndex: number;

  badge: string = 'secondary';
  badgename: string = 'New Transaction';

  documentnumber: string = '';
  selectedUoms: any[] = [];

  // Actions
  spinnerHidden: boolean = true;
  printerHidden: boolean = true;
  saveHidden: boolean = true;
  confirmHidden: boolean = true;
  approvedHidden: boolean = true;
  rejectHidden: boolean = true;
  dividerHidden: boolean = true;
  cancelHidden: boolean = true;
  deleteHidden: boolean = true;
  backToListHidden: boolean = false;

  decimalPipe: DecimalPipe = new DecimalPipe("en-US");
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );

  constructor(private activeroute: ActivatedRoute,
    private router: Router,
    private apiservice: GlobalApiService,
    private events: EventService,
  ) {

    this.initializeData();
  }


  private  initializeData() {
    try {
      this.apiservice.getData(
        'InventoryCount',
        'GetMaxId'
      ).subscribe((response: any) => {

        console.log("docnum", response.value);

        this.documentForm.setValue({
          docnum: response.value
        });

      })
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }

  ngOnInit(): void {
    this.activeroute.params.subscribe(params => {
      this.documentnumber = params['documentnumber']; // Access the route parameter 'id'
    });

    if (this.documentnumber != undefined) {
      this.editTransaction(this.documentnumber);
    }
    else {
      this.addTransaction();
    }
  }

  addTransaction() {
  }

  editTransaction(documentnumber: string) { }

  submitTranaction() { }

  actionClick(actionid: number) {
    console.log(actionid);

    switch (actionid) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 9:
        break;
      case -1:
        this.BackToList();
        break;
      default:
        break;
    }
  }

  BackToList() {
    this.router.navigate(['/inventory/inventory-counting']);
  }

  ItemEvent(val: any) {
    console.log("Item Selected", val);

    this.apiservice.getData(
      'Item',
      'UomList',
      val.ins_ItemCode
    ).subscribe((uomlist: any) => {

      let itemcode = val.ins_ItemCode;
      let itemname = val.ins_ItemName;
      let unitcost = this.ConvertToDouble(val.ins_InventoryCost);
      let unitquantity = 1;
      let amount = unitcost * unitquantity;
      let linetotal = this.ConvertToDouble(amount.toString());
      let unituom = val.ins_InventoryUom;


      let inventoryuom = val.ins_InventoryUom;
      let inventorycost= this.ConvertToDouble(val.ins_InventoryCost);
      let inventoryquantity = 1;


      let unitbasecost = this.ConvertToDouble(val.ins_InventoryCost);
      let unitbasequantity = 1;
      let unitbaseuom = val.ins_InventoryUom;
      const newTransaction = new ItemTransaction(itemcode, itemname, uomlist, unituom, unitquantity, unitcost, linetotal, inventoryuom,
        inventoryquantity, inventorycost, unitbaseuom, unitbasequantity, unitbasecost);
      this.itemTransactions.push(newTransaction)

      this.lastAddedIndex = this.itemTransactions.length - 1;

      if (!this.selectedUoms[this.lastAddedIndex]) {
        this.selectedUoms[this.lastAddedIndex] = [];
      }

      if (this.lastAddedIndex >= 0) {
        this.selectedUoms[this.lastAddedIndex] = this.itemTransactions[this.lastAddedIndex].ins_ItemUnitOfMeasurement[0];
      }

      this.onSelectChange(this.itemTransactions[this.lastAddedIndex], this.selectedUoms[this.lastAddedIndex], this.lastAddedIndex);
    });

    console.log(this.itemTransactions);
  }

  ConvertToDouble(val: string): number {
    let input = "";
    if (val && typeof val === 'string') {
      if (val.includes(',')) {
        input = this.decimalPipe.transform(val.replace(',', ''), "1.2-2");
      } else {
        input = this.decimalPipe.transform(val, "1.2-2");
      }
    }
    else{
      input = this.decimalPipe.transform(val, "1.2-2");
    }

    const convert = input.replace(',', '');
    const numericValue = Number(convert);

    if (isNaN(numericValue)) {
      // If the conversion results in NaN (Not a Number), return null or handle the error as needed.
      return 0;
    }

    return numericValue;
  }

  onSelectChange(selectedItem: any, selectedUom: any, index: number) {
    selectedItem.ins_UnitUom = selectedUom.ins_BaseUOM;
    selectedItem.ins_UnitBaseUom = selectedUom.ins_InventoryUOM;
    selectedItem.ins_UnitBaseQuantity = selectedUom.ins_UnitBaseQuantity;

    let unitbasecost = this.ConvertToDouble(selectedItem.ins_UnitBaseCost);
    let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity);
    let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity);
    let inventoryquantity = basequantity * quantity;

    selectedItem.ins_InventoryQuantity = inventoryquantity;

    let unitcost = basequantity * unitbasecost;
    let linetotal = inventoryquantity * unitbasecost;

    selectedItem.ins_UnitCost = this.ConvertToDouble(this.decimalPipe.transform(unitcost, "1.2-2"));
    selectedItem.ins_LineTotal = this.ConvertToDouble(this.decimalPipe.transform(linetotal, "1.2-2"));

    // selectedItem.ins_UnitBaseCost = selectedUom.ins_UnitBaseCost;
    console.log('Selected item:', selectedItem);
    console.log('Selected uom object:', selectedUom);
    console.log('Selected uom object index:', selectedUom[index]);
    // You can perform additional actions here based on the selected uom object for this item
  }

  onQuantityChange(selectedItem: any, val: any) {

    const _qty = val.target.value;
    selectedItem.ins_UnitQuantity = this.ConvertToDouble(_qty);

    console.log(selectedItem.ins_UnitQuantity);

    let unitbasecost = this.ConvertToDouble(selectedItem.ins_UnitBaseCost);
    let quantity = this.ConvertToDouble(selectedItem.ins_UnitQuantity);
    let basequantity = this.ConvertToDouble(selectedItem.ins_UnitBaseQuantity);
    let inventoryquantity = basequantity * quantity;

    selectedItem.ins_InventoryQuantity = inventoryquantity;


    let unitcost = basequantity * unitbasecost;
    let linetotal = inventoryquantity * unitbasecost;
    selectedItem.ins_UnitCost = this.ConvertToDouble(this.decimalPipe.transform(unitcost, "1.2-2"));
    selectedItem.ins_LineTotal = this.ConvertToDouble(this.decimalPipe.transform(linetotal, "1.2-2"));

    console.log('onQuantityChange Selected item:', selectedItem);
    console.log('onQuantityChange Selected val:', val);
    console.log('onQuantityChange Selected _qty:', _qty);
    // this.itemList[a.target.id].ins_InventoryQuantity = _qty;
  }






}
