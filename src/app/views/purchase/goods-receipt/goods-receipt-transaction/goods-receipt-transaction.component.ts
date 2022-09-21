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
  @Output() goodsReceiptEvent = new EventEmitter();

  headerForm!: FormGroup;
  isViewHidden = false;
  isEditHidden = false;
  goodsreceiptdetails: GoodsReceiptDetails[] = [];
  goodsreceiptinfo: GoodsReceipt[] = [];
  userInfo: any;
  isReadOnly = false;
  state = 'add';


  isHiddenSave = false;
  isHiddenAction = false;
  isHiddenActionRow = false;
  isHiddenAddItem = false;
  isHiddenApproveBtn = false;
  isHiddenRejectBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;
  isReadOnlyRecDate = false;


  // initialized values
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );
  receivedate = this.datepipe.transform(this.date, 'yyyy-MM-dd');

  badge: string = 'warning';
  badgename: string = 'Pending';

  constructor(
    private fb: FormBuilder,
    private user: Users,
    private purchaseorder: PurchaseOrder,
    private supplier: Supplier,
    private goodsreceiptapi: GoodsReceiptApi,
    private goodsreceipt: GoodsReceipt,
    private goodsreceiptlines: GoodsReceiptDetails,
    public swal: SwalService
  ) {
    // declare the form group fields
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      goodsreceiptid: '',
      purchaseorderid: '',
      purchaseorderdocnum: '',
      suppliercode: '',
      suppliername: '',
      branchcode: this.userInfo[0].ins_BranchCode,
      branchname: this.userInfo[0].ins_BranchName,
      docnum: '',
      docdate: this.datepipe.transform(this.postingdate, 'yyyy-MM-dd'),
      deldate: '',
      recdate: this.datepipe.transform(this.receivedate, 'yyyy-MM-dd'),
      owner: this.userInfo[0].ins_FullName,
      docstatus: 0,
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.goodsreceiptData.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEditEvent();
    }
  }

  async isAddEvent() {
    this.isViewHidden = false;
    this.isEditHidden = true;
    this.isReadOnly = false;
    this.state = 'add';

    const _docnum = await this.goodsreceiptapi.get_GoodsReceiptBy('GetMaxId');
    this.headerForm.patchValue({
      goodsreceiptid: 0,
      docnum: _docnum,
    });
  }

  async isEditEvent() {
    this.isViewHidden = true;
    this.isEditHidden = false;
    this.isReadOnly = true;
    this.state = 'edit';

    for (var a of this.goodsreceiptData as any) {
      switch (a.ins_DocStatus) {
        case 0: // Pending
          this.badge = 'warning';
          this.badgename = 'PENDING';
          break;
        case 1: // Approved
          this.badge = 'success';
          this.badgename = 'APPROVED';

          this.isHiddenSave = true;
          this.isHiddenActionRow = true;
          this.isReadOnlyRecDate = true;
          break;
        case 2: // Reject
          this.badge = 'danger';
          this.badgename = 'REJECTED';
          break;
        case 3: // Reject
          this.badge = 'danger';
          this.badgename = 'CLOSED';
          break;
        default:
          break;
      }

      if (a.ins_DocStatus == 0) {
        this.isViewHidden = false;
        this.isEditHidden = true;
        this.isReadOnly = false;
      }

      this.headerForm.setValue({
        goodsreceiptid: a.ins_GoodsReceiptID,
        purchaseorderid: a.ins_PurchaseOrderID,
        purchaseorderdocnum: a.ins_PurchaseOrderDocNum,
        suppliercode: a.ins_SupplierCode,
        suppliername: a.ins_SupplierName,
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        docnum: a.ins_DocNum,
        docstatus: a.ins_DocStatus,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),
        deldate: this.datepipe.transform(a.ins_DeliveryDate, 'yyyy-MM-dd'),
        recdate: this.datepipe.transform(a.ins_ReceivedDate, 'yyyy-MM-dd'),
        owner: a.ins_CreatedBy,
      });

      this.goodsreceiptdetails.length = 0;
      for (var val of a.ins_GoodsReceiptDetails) {
        this.goodsreceiptlines = {} as any;

        this.goodsreceiptlines.ins_GoodsReceiptID = val.ins_GoodsReceiptID;
        this.goodsreceiptlines.ins_GoodsReceiptDetailID =
          val.ins_GoodsReceiptDetailID;
        this.goodsreceiptlines.ins_BranchCode = val.ins_BranchCode;
        this.goodsreceiptlines.ins_BranchName = val.ins_BranchName;
        this.goodsreceiptlines.ins_CreatedBy = val.ins_CreatedBy;
        this.goodsreceiptlines.ins_InventoryQuantity =
          val.ins_InventoryQuantity;
        this.goodsreceiptlines.ins_InventoryUom = val.ins_InventoryUom;
        this.goodsreceiptlines.ins_ItemCode = val.ins_ItemCode;
        this.goodsreceiptlines.ins_ItemDescription = val.ins_ItemDescription;
        this.goodsreceiptlines.ins_PurchasePackQuantity =
          val.ins_PurchasePackQuantity;
        this.goodsreceiptlines.ins_PurchasePackageUom =
          val.ins_PurchasePackageUom;
        this.goodsreceiptlines.ins_PurchaseUom = val.ins_PurchaseUom;
        this.goodsreceiptlines.ins_Quantity = val.ins_Quantity;
        this.goodsreceiptlines.ins_ReceivedInventoryQuantity =
          val.ins_ReceivedInventoryQuantity;
        this.goodsreceiptlines.ins_ReceivedQuantity = val.ins_ReceivedQuantity;
        this.goodsreceiptlines.ins_TaxAmount = val.ins_TaxAmount;
        this.goodsreceiptlines.ins_UnitCost = val.ins_UnitCost;
        this.goodsreceiptlines.ins_UnitCostEx = val.ins_UnitCostEx;
        this.goodsreceiptlines.ins_UnitCostInc = val.ins_UnitCostInc;
        this.goodsreceiptlines.ins_VatGroup = val.ins_VatGroup;

        this.goodsreceiptlines.ins_PurchaseOrderQuantity =
          val.ins_BalanceQuantity;
        // this.goodsreceiptlines.ins_PurchaseOrderQuantity = val.ins_Quantity;
        this.goodsreceiptlines.ins_BaseLineNum = val.ins_LineNum;

        this.goodsreceiptdetails.push(val);
      }
    }
  }

  purchaseorderSelected(e: PurchaseOrder) {
    this.purchaseorder = e;
    this.headerForm.patchValue({
      purchaseorderid: this.purchaseorder.ins_PurchaseOrderID,
      purchaseorderdocnum: this.purchaseorder.ins_DocNum,
      suppliercode: this.purchaseorder.ins_SupplierCode,
      suppliername: this.purchaseorder.ins_SupplierName,
      deldate: this.datepipe.transform(
        this.purchaseorder.ins_DeliveryDate,
        'yyyy-MM-dd'
      ),
    });

    this.goodsreceiptdetails.length = 0;
    for (var val of this.purchaseorder.ins_PurchaseOrderDetails as any) {
      this.goodsreceiptlines = {} as any;

      this.goodsreceiptlines.ins_BranchCode = val.ins_BranchCode;
      this.goodsreceiptlines.ins_BranchName = val.ins_BranchName;
      this.goodsreceiptlines.ins_CreatedBy = val.ins_CreatedBy;
      this.goodsreceiptlines.ins_InventoryQuantity = val.ins_InventoryQuantity;
      this.goodsreceiptlines.ins_InventoryUom = val.ins_InventoryUom;
      this.goodsreceiptlines.ins_ItemCode = val.ins_ItemCode;
      this.goodsreceiptlines.ins_ItemDescription = val.ins_ItemDescription;
      this.goodsreceiptlines.ins_PurchasePackQuantity =
        val.ins_PurchasePackQuantity;
      this.goodsreceiptlines.ins_PurchasePackageUom =
        val.ins_PurchasePackageUom;
      this.goodsreceiptlines.ins_PurchaseUom = val.ins_PurchaseUom;
      this.goodsreceiptlines.ins_Quantity = val.ins_Quantity;
      this.goodsreceiptlines.ins_ReceivedInventoryQuantity =
        val.ins_ReceivedInventoryQuantity;
      this.goodsreceiptlines.ins_TaxAmount = val.ins_TaxAmount;
      this.goodsreceiptlines.ins_UnitCost = val.ins_UnitCost;
      this.goodsreceiptlines.ins_UnitCostEx = val.ins_UnitCostEx;
      this.goodsreceiptlines.ins_UnitCostInc = val.ins_UnitCostInc;
      this.goodsreceiptlines.ins_VatGroup = val.ins_VatGroup;

      // this.goodsreceiptlines.ins_PurchaseOrderQuantity = val.ins_Quantity;
      // this.goodsreceiptlines.ins_ReceivedQuantity = val.ins_ReceivedQuantity;
      this.goodsreceiptlines.ins_ReceivedQuantity = 0;
      this.goodsreceiptlines.ins_PurchaseOrderQuantity =
        val.ins_BalanceQuantity;

      this.goodsreceiptlines.ins_BaseLineNum = val.ins_LineNum;

      this.goodsreceiptdetails.push(this.goodsreceiptlines);
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
    this.goodsreceiptlines.ins_PurchasePackQuantity =
      e.ins_PurchasePackQuantity;
    (this.goodsreceiptlines.ins_BranchCode = this.userInfo[0].ins_BranchCode),
      (this.goodsreceiptlines.ins_BranchName = this.userInfo[0].ins_BranchName);
    this.goodsreceiptlines.ins_CreatedBy = this.userInfo[0].ins_FullName;
    this.goodsreceiptlines.ins_InventoryUom = e.ins_InventoryUom;
    this.goodsreceiptlines.ins_Quantity = 0;
    this.goodsreceiptlines.ins_ReceivedQuantity = 0;
    this.goodsreceiptlines.ins_UnitCost = e.ins_PurchasePrice;

    this.goodsreceiptdetails.push(this.goodsreceiptlines);
  }

  onSubmit() {
    this.goodsreceipt.ins_Badge = '';
    this.goodsreceipt.ins_BadgeName = '';

    this.goodsreceipt.ins_GoodsReceiptID = this.headerForm.value.goodsreceiptid;
    this.goodsreceipt.ins_SupplierCode = this.headerForm.value.suppliercode;
    this.goodsreceipt.ins_SupplierName = this.headerForm.value.suppliername;
    this.goodsreceipt.ins_BranchCode = this.headerForm.value.branchcode;
    this.goodsreceipt.ins_BranchName = this.headerForm.value.branchname;
    this.goodsreceipt.ins_DocNum = this.headerForm.value.docnum;
    this.goodsreceipt.ins_PostingDate = this.datepipe.transform(
      this.headerForm.value.docdate,
      'yyyy-MM-dd'
    ) as unknown as Date;
    this.goodsreceipt.ins_DeliveryDate = this.datepipe.transform(
      this.headerForm.value.deldate,
      'yyyy-MM-dd'
    ) as unknown as Date;
    this.goodsreceipt.ins_CreatedBy = this.headerForm.value.owner;
    this.goodsreceipt.ins_ReceivedDate = this.datepipe.transform(
      this.headerForm.value.recdate,
      'yyyy-MM-dd'
    ) as unknown as Date;
    // this.goodsreceipt.ins_DocStatus = 0;
    this.goodsreceipt.ins_Received = 1;
    this.goodsreceipt.ins_PurchaseOrderDocNum =
      this.headerForm.value.purchaseorderdocnum;
    this.goodsreceipt.ins_PurchaseOrderID =
      this.headerForm.value.purchaseorderid;

    this.goodsreceipt.ins_GoodsReceiptDetails = this.goodsreceiptdetails;

    if (this.state == 'add') {
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

  onCancel() {
    this.goodsReceiptEvent.emit();
  }

  deleteItem(a: any) {
    this.goodsreceiptdetails.splice(a, 1);
  }
  onchange(a: any) {
    const _qty = a.target.value;
    const _recqty = this.goodsreceiptdetails[a.target.id].ins_ReceivedQuantity;
    const _poqty =
      this.goodsreceiptdetails[a.target.id].ins_PurchaseOrderQuantity;
    const _packageqty =
      this.goodsreceiptdetails[a.target.id].ins_PurchasePackQuantity;
    const _inventoryqty = _packageqty * _qty;

    if (_poqty < _qty) {
      this.swal.commonSwalCentered(
        'Recieve Quantity is Greater Than PO Quantity',
        'error'
      );
      this.goodsreceiptdetails[a.target.id].ins_ReceivedQuantity = _recqty;
    } else {
      this.goodsreceiptdetails[a.target.id].ins_ReceivedQuantity =
        a.target.value;
      this.goodsreceiptdetails[a.target.id].ins_ReceivedInventoryQuantity =
        _inventoryqty;
    }
  }
}
