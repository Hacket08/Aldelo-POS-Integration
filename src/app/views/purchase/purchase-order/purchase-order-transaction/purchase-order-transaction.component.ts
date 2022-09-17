import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SwalService } from '../../../../../_services/swal-service';

import { ItemService } from '../../../../../_shared/items/item.service';
import { SupplierService } from '../../../../../_shared/supplier/supplier.service';
import { PurchaseOrderService } from '../../../../../_shared/purchase-order/purcahse-order.service';

import { Item } from '../../../../../_model/item/item';
import { Supplier } from '../../../../../_model/supplier/supplier';

import { Users } from '../../../../../_services/user.api';
import { PurchaseOrderApi } from '../../../../../_shared/purchase-order/purchase-order.api';
import { PurchaseOrder } from 'src/_model/purchase-order/purchase-order';
import { PurchaseOrderDetails } from 'src/_model/purchase-order-details/purchase-order-details';

class POItem {
  itemcode: string = '';
  itemname: string = '';
}

@Component({
  selector: 'app-purchase-order-transaction',
  templateUrl: './purchase-order-transaction.component.html',
  styleUrls: ['./purchase-order-transaction.component.scss'],
})
export class PurchaseOrderTransactionComponent implements OnInit {

  @Output() purchaseOrderEvent = new EventEmitter();
  @Input() purchaseData: PurchaseOrder[] = [];

  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(this.date.setDate(this.date.getDate() + 3), 'yyyy-MM-dd');
  headerForm!: FormGroup;

  purchaseorderdetails: PurchaseOrderDetails[] = [];
  
  suppliers: any[] = [];

  supplier?: Supplier;
  docstatus: string = 'Pending';

  constructor(
    public user: Users,
    public purchaseorderapi: PurchaseOrderApi,
    public swal: SwalService,
    private fb: FormBuilder,
    private purchaseorderitem: PurchaseOrderDetails,
    private purchaseorder: PurchaseOrder,
  ) {
    this.headerForm = this.fb.group({
      suppliercode: '',
      suppliername: '',
      branchcode: '',
      branchname: '',
      docnum: '',
      docdate: '',
      deldate: '',
      owner: ''
    });
  }

  async ngOnInit(): Promise<void> {
    const _docnum = await this.purchaseorderapi.get_PurchaseOrderBy('GetMaxId');
    console.log('Supplier Data', _docnum);
    this.headerForm.patchValue({ 
      docnum: _docnum,
      docdate: this.postingdate,
      deldate: this.deliverydate,
     });
  }

  PassEvent() {
    this.purchaseOrderEvent.emit();
  }

  eventAddRow(data: any) {
    console.log(data);

    const userInfo = this.user.getCurrentUser();
    this.purchaseorderitem = new PurchaseOrderDetails;

    this.purchaseorderitem.ins_ItemCode = data.ins_ItemCode;
    this.purchaseorderitem.ins_ItemDescription = data.ins_ItemName;
    this.purchaseorderitem.ins_PurchaseUom = data.ins_PurchaseUom;
    this.purchaseorderitem.ins_VatGroup = data.ins_VatGroup;
    this.purchaseorderitem.ins_PurchasePackageQuantity = data.ins_PurchasePackQuantity;
    this.purchaseorderitem.ins_BranchCode = userInfo[0].ins_BranchCode;
    this.purchaseorderitem.ins_BranchName = userInfo[0].ins_BranchName;
    this.purchaseorderitem.ins_InventoryUom = data.ins_InventoryUom;
    this.purchaseorderitem.ins_Quantity = 0;

    this.purchaseorderdetails.push(this.purchaseorderitem);
  }

  eventSelectSupplier(data: Supplier) {
    this.suppliers.length = 0;
    const userInfo = this.user.getCurrentUser();

    this.supplier = data;

    this.headerForm.patchValue({     
      suppliercode: this.supplier.ins_SupplierCode, 
      suppliername: this.supplier.ins_SupplierName, 
      branchcode: userInfo[0].ins_BranchCode,
      branchname: userInfo[0].ins_BranchName,
      owner: userInfo[0].ins_FullName,
     });
  }

  numericOnly(event: any): boolean {
    let patt = /^[0-9]+(\.[0-9]{1,2})?$/;
    let result = patt.test(event.key);
    return result;
  }

  onSubmit() {
    this.purchaseorder.ins_SupplierCode = this.headerForm.value.suppliercode;
    this.purchaseorder.ins_SupplierName = this.headerForm.value.suppliername;
    this.purchaseorder.ins_BranchCode = this.headerForm.value.branchcode;
    this.purchaseorder.ins_BranchName = this.headerForm.value.branchname;
    this.purchaseorder.ins_DocNum = this.headerForm.value.docnum;
    this.purchaseorder.ins_PostingDate = this.headerForm.value.docdate;
    this.purchaseorder.ins_DeliveryDate = this.headerForm.value.deldate;
    this.purchaseorder.ins_CreatedBy = this.headerForm.value.owner;

    // if (this.checkActionAdd() == true) {
    //   this.purchaseorderapi.post_PurchaseOrder(this.purchaseorder, "PostAsync");
    // } else {
    //   this.purchaseorderapi.put_PurchaseOrder(this.purchaseorder);
    // }

    console.log("Items", this.purchaseorderdetails);
    this.purchaseOrderEvent.emit();
  }


  checkActionAdd() {
    if (this.purchaseData.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  deleteItem(i: any) {
    this.purchaseorderdetails.splice(i, 1);
  }

  change(event: any) 
  {
    this.purchaseorderdetails[event.target.id].ins_Quantity = event.target.value;

    // console.log(this.purchaseorderdetails[event.target.id]);
    // console.log("Items", this.purchaseorderdetails);
  }
}
