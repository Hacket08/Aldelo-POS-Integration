import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SwalService } from 'src/_services/swal-service';

import { Item } from 'src/_model/item/item';
import { Supplier } from 'src/_model/supplier/supplier';
import { PurchaseOrder } from 'src/_model/purchase-order/purchase-order';
import { PurchaseOrderDetails } from 'src/_model/purchase-order-details/purchase-order-details';
import { GoodsReceipt } from 'src/_model/goods-receipt/goods-receipt';
import { GoodsReceiptDetails } from 'src/_model/goods-receipt-details/goods-receipt-details';

import { Users } from 'src/_services/user.api';
import { GoodsReceiptApi } from 'src/_shared/goods-receipt/goods-receipt.api';

@Component({
  selector: 'app-goods-receipt-transaction',
  templateUrl: './goods-receipt-transaction.component.html',
  styleUrls: ['./goods-receipt-transaction.component.scss'],
})
export class GoodsReceiptTransactionComponent implements OnInit {
  @Input() goodsreceiptData: GoodsReceipt[] = [];


  headerForm!: FormGroup;
  isViewHidden = false;
  isEditHidden = false;
  goodsreceiptdetails: GoodsReceiptDetails[] = [];
  goodsreceiptinfo: GoodsReceipt[] = [];
  userInfo: any;

  // initialized values
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'MM/dd/yyyy');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'MM/dd/yyyy'
  );
  receivedate = this.datepipe.transform(this.date, 'MM/dd/yyyy');
  docstatus: string = 'Pending';

  
  constructor(
    private fb: FormBuilder,
    private user: Users,
    private purchaseorder: PurchaseOrder,
    private supplier: Supplier,
    private goodsreceiptapi: GoodsReceiptApi,
    private goodsreceipt: GoodsReceipt,
    private goodsreceiptlines: GoodsReceiptDetails,
  ) {
    // declare the form group fields
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      purchaseorderid: '',
      purchaseorderdocnum: '',
      suppliercode: '',
      suppliername: '',
      branchcode: this.userInfo[0].ins_BranchCode,
      branchname: this.userInfo[0].ins_BranchName,
      docnum: '',
      docdate: this.datepipe.transform(this.postingdate, 'MM/dd/yyyy'),
      deldate: '',
      recdate: this.datepipe.transform(this.receivedate, 'MM/dd/yyyy'),
      owner: this.userInfo[0].ins_FullName,
      docstatus: 0,
    });

  }

  async ngOnInit(): Promise<void> {
    this.isViewHidden = false;
    this.isEditHidden = true;

    const _docnum = await this.goodsreceiptapi.get_GoodsReceiptBy('GetMaxId');
    this.headerForm.patchValue({
      docnum: _docnum,
    });
  }

  purchaseorderSelected(e: PurchaseOrder) {
    console.log(e);
    this.purchaseorder = e;
    this.headerForm.patchValue({
      purchaseorderid: this.purchaseorder.ins_PurchaseOrderID,
      purchaseorderdocnum: this.purchaseorder.ins_DocNum,
      suppliercode: this.purchaseorder.ins_SupplierCode,
      suppliername: this.purchaseorder.ins_SupplierName,
      deldate: this.datepipe.transform(this.purchaseorder.ins_DeliveryDate, 'MM/dd/yyyy'),
    });

    this.goodsreceiptdetails.length = 0;
    for (var val of this.purchaseorder.ins_PurchaseOrderDetails as any) {
      this.goodsreceiptdetails.push(val);
    }
  }

  supplierSelected(e: Supplier) {
    this.supplier = e;
    this.headerForm.patchValue({
      suppliercode: this.supplier.ins_SupplierCode,
      suppliername: this.supplier.ins_SupplierName,
    });
  }

  itemSelected(e: Item) {
    this.goodsreceiptlines = new GoodsReceiptDetails();

    this.goodsreceiptlines.ins_ItemCode = e.ins_ItemCode;
    this.goodsreceiptlines.ins_ItemDescription = e.ins_ItemName;
    this.goodsreceiptlines.ins_PurchaseUom = e.ins_PurchaseUom;
    this.goodsreceiptlines.ins_VatGroup = e.ins_VatGroup;
    this.goodsreceiptlines.ins_PurchasePackQuantity = e.ins_PurchasePackQuantity;
    this.goodsreceiptlines.ins_BranchCode = this.userInfo[0].ins_BranchCode,
    this.goodsreceiptlines.ins_BranchName = this.userInfo[0].ins_BranchName;
    this.goodsreceiptlines.ins_CreatedBy = this.userInfo[0].ins_FullName;
    this.goodsreceiptlines.ins_InventoryUom = e.ins_InventoryUom;
    this.goodsreceiptlines.ins_Quantity = 0;
    this.goodsreceiptlines.ins_UnitCost = e.ins_PurchasePrice;

    this.goodsreceiptdetails.push(this.goodsreceiptlines);
  }

  onSubmit() {
    this.goodsreceipt.ins_SupplierCode = this.headerForm.value.suppliercode;
    this.goodsreceipt.ins_SupplierName = this.headerForm.value.suppliername;
    this.goodsreceipt.ins_BranchCode = this.headerForm.value.branchcode;
    this.goodsreceipt.ins_BranchName = this.headerForm.value.branchname;
    this.goodsreceipt.ins_DocNum = this.headerForm.value.docnum;
    this.goodsreceipt.ins_PostingDate = this.datepipe.transform(this.headerForm.value.docdate, 'yyyy-MM-dd') as unknown as Date;
    this.goodsreceipt.ins_DeliveryDate = this.datepipe.transform(this.headerForm.value.deldate, 'yyyy-MM-dd') as unknown as Date;
    this.goodsreceipt.ins_CreatedBy = this.headerForm.value.owner;
    this.goodsreceipt.ins_ReceivedDate = this.datepipe.transform(this.headerForm.value.recdate, 'yyyy-MM-dd') as unknown as Date;
    this.goodsreceipt.ins_DocStatus = 1;
    this.goodsreceipt.ins_Received = 1;
    this.goodsreceipt.ins_PurchaseOrderDocNum = this.headerForm.value.purchaseorderdocnum;
    this.goodsreceipt.ins_PurchaseOrderID = this.headerForm.value.purchaseorderid;

    this.goodsreceipt.ins_GoodsReceiptDetails = this.goodsreceiptdetails;

    console.log(this.goodsreceipt);


    if (this.checkActionAdd() == true) {
      this.goodsreceiptapi.post_GoodsReceipt(this.goodsreceipt, 'PostAsync');
    } else {
      this.goodsreceiptapi.put_GoodsReceipt(this.goodsreceipt);
    }

  }

  checkActionAdd() {
    if (this.goodsreceiptData.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  onCancel()
  {
    // this.purchaseOrderEvent.emit();
  }

  deleteItem(a: any) {
    this.goodsreceiptdetails.splice(a, 1);
  }
  onchange(a: any) {
    const _qty = a.target.value;
    const _packageqty = this.goodsreceiptdetails[a.target.id].ins_PurchasePackQuantity;
    const _inventoryqty = _packageqty * _qty;

    this.goodsreceiptdetails[a.target.id].ins_ReceivedQuantity = a.target.value;
    this.goodsreceiptdetails[a.target.id].ins_ReceivedInventoryQuantity = _inventoryqty;

    console.log("sample", this.goodsreceiptdetails[a.target.id]);
  }
}
