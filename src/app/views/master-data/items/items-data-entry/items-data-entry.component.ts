import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../../../_services/swal-service';
import { ApiHttpService } from '../../../../../_services/api-http.service';

// load item shared files
import { Item } from 'src/_model/item/item';
import { ItemApi } from '../../../../../_shared/items/item.api';

@Component({
  selector: 'app-items-data-entry',
  templateUrl: './items-data-entry.component.html',
  styleUrls: ['./items-data-entry.component.scss'],
})
export class ItemsDataEntryComponent implements OnInit {
  @Output() itemDataEvent = new EventEmitter();
  @Input() itemData: Item[] = [];

  datepipe: DatePipe = new DatePipe('en-US');
  postingdate = this.datepipe.transform(new Date(), 'MM/dd/YYYY');
  simpleForm!: FormGroup;
  umber = 0;

  constructor(
    private fb: FormBuilder,
    public swal: SwalService,
    public http: ApiHttpService,
    public item: Item,
    public itemapi: ItemApi
  ) {
    this.simpleForm = this.fb.group({
      itemcode: [],
      itemname: [],
      frgnname: [],
      longname: [],
      barcode: [],
      vatgroup: [],
      itemtype: [],
      itemgroup: [],
      itemcategory: [],
      purchaseitem: 0,
      salesitem: 0,
      inventoryitem: 0,
      purchaseuom: [],
      salesuom: [],
      inventoryuom: [],
      numinpurchase: 0.00,
      numinsales: 0.00,
      numininventory: 0.00,

      purchasepackageuom: [],
      salespackageuom: [],
      inventorypackageuom: [],
      purchasepackquantity: 0.00,
      salespackquantity: 0.00,
      inventorypackquantity: 0.00,

      defaultwhs: [],
      onhand: 0.00,
      iscommited: 0.00,
      onorder: 0.00,
      unitprice: 0.00,
      purchaseprice: 0.00,
      inactive: 0,
    });
  }

  ngOnInit(): void {
    console.log("Child Component" ,this.itemData);
    for (var a of this.itemData as any) {
      this.simpleForm.reset();
      this.simpleForm.setValue({
        itemcode: a.ins_ItemCode,
        itemname: a.ins_ItemName,
        frgnname: a.ins_FrgnName,
        longname: a.ins_LongName,
        barcode: a.ins_Barcode,
        vatgroup: a.ins_VatGroup,
        itemtype: a.ins_ItemType,
        itemgroup: a.ins_ItemGroup,
        itemcategory: a.ins_ItemCategory,
        purchaseitem: a.ins_PurchaseItem === 1 ? true : false,
        salesitem: a.ins_SalesItem === 1 ? true : false,
        inventoryitem: a.ins_InventoryItem === 1 ? true : false,
        purchaseuom: a.ins_PurchaseUOM,
        salesuom: a.ins_SalesUOM,
        inventoryuom: a.ins_InventoryUOM,
        numinpurchase: a.ins_NumInPurchase,
        numinsales: a.ins_NumInSales,
        numininventory: a.ins_NumInInventory,


        purchasepackageuom: a.ins_PurchasePackageUOM,
        salespackageuom: a.ins_SalesPackageUOM,
        inventorypackageuom: a.ins_InventoryPackageUOM,
        purchasepackquantity: a.ins_PurchasePackQuantity,
        salespackquantity: a.ins_SalesPackQuantity,
        inventorypackquantity: a.ins_InventoryPackQuantity,



        defaultwhs: a.ins_DefaultWhs,
        onhand: a.ins_OnHand,
        iscommited: a.ins_IsCommited,
        onorder: a.ins_OnOrder,
        unitprice: a.ins_UnitPrice,
        purchaseprice: a.ins_PurchasePrice,
        inactive: a.ins_InActive === 1 ? true : false,
      });
    }
  }

  async loadData(a: any) {
    this.simpleForm.setValue({
      itemcode: a.ins_ItemCode,
      itemname: a.ins_Itemname,
      frgnname: a.ins_FrgnName,
      longname: a.ins_LongName,
      barcode: a.ins_Barcode,
      vatgroup: a.ins_VatGroup,
      itemtype: a.ins_ItemType,
      itemgroup: a.ins_ItemGroup,
      itemcategory: a.ins_ItemCategory,
      purchaseitem: a.ins_PurchaseItem === 1 ? true : false,
      salesitem: a.ins_SalesItem === 1 ? true : false,
      inventoryitem: a.ins_InventoryItem === 1 ? true : false,
      purchaseuom: a.ins_PurchaseUom,
      salesuom: a.ins_SalesUom,
      inventoryuom: a.ins_InventoryUom,
      numinpurchase: a.ins_NumInPurchase,
      numinsales: a.ins_NumInSales,
      numininventory: a.ins_NumInInventory,

      purchasepackageuom: a.ins_PurchasePackageUom,
      salespackageuom: a.ins_SalesPackageUom,
      inventorypackageuom: a.ins_InventoryPackageUom,
      purchasepackquantity: a.ins_PurchasePackQuantity,
      salespackquantity: a.ins_SalesPackQuantity,
      inventorypackquantity: a.ins_InventoryPackQuantity,

      defaultwhs: a.ins_DefaultWhs,
      onhand: a.ins_OnHand,
      iscommited: a.ins_IsCommited,
      onorder: a.ins_OnOrder,
      unitprice: a.ins_UnitPrice,
      purchaseprice: a.ins_PurchasePrice,
      inactive: a.ins_InActive === 1 ? true : false,
    });
  }

  PassEvent() {
    this.itemDataEvent.emit();
  }

  get f() {
    return this.simpleForm.controls;
  }

  onSubmit() {
    this.item.ins_ItemCode = this.simpleForm.value.itemcode;
    this.item.ins_ItemName = this.simpleForm.value.itemname;
    this.item.ins_FrgnName = this.simpleForm.value.frgnname;
    this.item.ins_LongName = this.simpleForm.value.longname;
    this.item.ins_Barcode = this.simpleForm.value.barcode;
    this.item.ins_VatGroup = this.simpleForm.value.vatgroup;
    this.item.ins_ItemType = this.simpleForm.value.itemtype;
    this.item.ins_ItemGroup = this.simpleForm.value.itemgroup;
    this.item.ins_ItemCategory = this.simpleForm.value.itemcategory;

    this.item.ins_PurchaseItem = this.simpleForm.value.purchaseitem === true ? 1 : 0;
    this.item.ins_SalesItem = this.simpleForm.value.salesitem === true ? 1 : 0;
    this.item.ins_InventoryItem = this.simpleForm.value.inventoryitem === true ? 1 : 0;
    this.item.ins_PurchaseUom = this.simpleForm.value.purchaseuom;
    this.item.ins_SalesUom = this.simpleForm.value.salesuom;
    this.item.ins_InventoryUom = this.simpleForm.value.inventoryuom;
    this.item.ins_NumInPurchase = this.simpleForm.value.numinpurchase;
    this.item.ins_NumInSales = this.simpleForm.value.numinsales;
    this.item.ins_NumInInventory = this.simpleForm.value.numininventory;
    
    this.item.ins_PurchasePackageUom = this.simpleForm.value.purchasepackageuom;
    this.item.ins_SalesPackageUom = this.simpleForm.value.salespackageuom;
    this.item.ins_InventoryPackageUom = this.simpleForm.value.inventorypackageuom;
    this.item.ins_PurchasePackQuantity = this.simpleForm.value.purchasepackquantity;
    this.item.ins_SalesPackQuantity = this.simpleForm.value.salespackquantity;
    this.item.ins_InventoryPackQuantity = this.simpleForm.value.inventorypackquantity;

    this.item.ins_DefaultWhs = this.simpleForm.value.defaultwhs;
    this.item.ins_OnHand = this.simpleForm.value.onhand;
    this.item.ins_IsCommited = this.simpleForm.value.iscommited;
    this.item.ins_OnOrder = this.simpleForm.value.onorder;
    this.item.ins_UnitPrice = this.simpleForm.value.unitprice;
    this.item.ins_PurchasePrice = this.simpleForm.value.purchaseprice;
    this.item.ins_InActive = this.simpleForm.value.inactive === true ? 1 : 0;

    console.log(this.item);
    if (this.checkActionAdd() == true) {
      this.itemapi.post_item(this.item);
    } else {
      this.itemapi.put_item(this.item);
    }
    this.itemDataEvent.emit();
  }

  checkActionAdd() {
    if (this.itemData.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}
