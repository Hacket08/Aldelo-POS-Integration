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
import { SwalService } from '../../../../../_services/swal-service';
import { GlobalService } from 'src/_shared/api/service';

import { Item } from 'src/_model/item/item';
import { Supplier } from 'src/_model/supplier/supplier';
import { PurchaseOrder } from 'src/_model/purchase-order/purchase-order';
import { GoodsReceipt } from 'src/_model/goods-receipt/goods-receipt';
import { GoodsReceiptDetails } from 'src/_model/goods-receipt/goods-receipt-details';

import { Users } from 'src/_services/user.api';
import { GoodsReceiptApi } from 'src/_shared/goods-receipt/goods-receipt.api';

@Component({
  selector: 'app-goods-receipt-transaction',
  templateUrl: './goods-receipt-transaction.component.html',
  styleUrls: ['./goods-receipt-transaction.component.scss'],
})
export class GoodsReceiptTransactionComponent implements OnInit {
  @Input() dataList: GoodsReceipt[] = [];
  @Output() outputEvent = new EventEmitter();
  headerForm!: FormGroup;
  itemdetails: GoodsReceiptDetails[] = [];
  badge: string = 'warning';
  badgename: string = 'Pending';

  suppliers: any[] = [];
  supplier?: Supplier;

  // Header Data
  userInfo: any;
  userApprover: any;
  userOwner: any;
  docId: number;
  state = 'add';

  isHiddenPrinterBtn = false;
  isHiddenSave = false;
  isHiddenAction = false;
  isHiddenActionRow = false;

  isHiddenAddItem = false;
  isHiddenApproveBtn = false;
  isHiddenRejectBtn = false;
  isHiddenCancelBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;

  isReadOnlyDeliveryDate = false;
  isHiddenRowQuantity = false;

  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );

  receivedate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  isDisablePoSelection = false;
  isReadOnlyRecDate = false;

  constructor(
    private user: Users,
    private globalservice: GlobalService,
    private fb: FormBuilder,
    private swal: SwalService,
    private linedata: GoodsReceiptDetails,
    private headerdata: GoodsReceipt
  ) {
    // declare the form group fields
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      goodsreceiptid: '',
      purchaseorderid: '',
      purchaseorderdocnum: '',
      suppliercode: '',
      suppliername: '',
      docnum: '',
      deldate: '',
      recdate: this.datepipe.transform(this.receivedate, 'yyyy-MM-dd'),
      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      docdate: this.datepipe.transform(this.postingdate, 'yyyy-MM-dd'),
      owner: this.userInfo.fullName,
      docstatus: 0,
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.dataList.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEditEvent();
    }
  }

  async isAddEvent() {
    this.formDefault();
    this.userInfo = this.user.getCurrentUser();
    this.userApprover = this.user.getCurrentUserApprover();
    const output = (await this.globalservice.getMaxId('GoodsReceipt')) as any;

    this.headerForm.patchValue({
      goodsreceiptid: 0,
      docnum: output.value,
      docdate: this.postingdate,
      deldate: this.deliverydate,
      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      owner: this.userInfo.fullName,
      // docstatus: this.userApprover.length > 0 ? 0 : 1,
    });
  }

  async isEditEvent() {
    console.log(this.dataList);
    for (var a of this.dataList as any) {
      this.docId = a.ins_GoodsReceiptID;
      this.userOwner = a.ins_CreatedBy;
      this.onLoadForm(a.ins_DocStatus);

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

      for (var val of a.ins_GoodsReceiptDetails) {
        this.itemdetails.push(val);
      }
      console.log(this.itemdetails);
    }
    // for (var a of this.dataList as any) {


    //   this.itemdetails.length = 0;
    //   for (var list of a.ins_PurchaseOrderDetails) {
    //     this.itemdetails.push(list);
    //   }

    //   this.itemdetails.length = 0;
    //   for (var val of a.ins_GoodsReceiptDetails) {
    //     this.linedata = {} as any;

    //     this.linedata.ins_GoodsReceiptID = val.ins_GoodsReceiptID;
    //     this.linedata.ins_GoodsReceiptDetailID = val.ins_GoodsReceiptDetailID;
    //     this.linedata.ins_BranchCode = val.ins_BranchCode;
    //     this.linedata.ins_BranchName = val.ins_BranchName;
    //     this.linedata.ins_CreatedBy = val.ins_CreatedBy;
    //     this.linedata.ins_InventoryQuantity = val.ins_InventoryQuantity;
    //     this.linedata.ins_InventoryUom = val.ins_InventoryUom;
    //     this.linedata.ins_ItemCode = val.ins_ItemCode;
    //     this.linedata.ins_ItemDescription = val.ins_ItemDescription;
    //     this.linedata.ins_PurchasePackQuantity = val.ins_PurchasePackQuantity;
    //     this.linedata.ins_PurchasePackageUom = val.ins_PurchasePackageUom;
    //     this.linedata.ins_PurchaseUom = val.ins_PurchaseUom;
    //     this.linedata.ins_Quantity = val.ins_Quantity;
    //     this.linedata.ins_ReceivedInventoryQuantity =
    //       val.ins_ReceivedInventoryQuantity;
    //     this.linedata.ins_ReceivedQuantity = val.ins_ReceivedQuantity;
    //     this.linedata.ins_TaxAmount = val.ins_TaxAmount;
    //     this.linedata.ins_UnitCost = val.ins_UnitCost;
    //     this.linedata.ins_UnitCostEx = val.ins_UnitCostEx;
    //     this.linedata.ins_UnitCostInc = val.ins_UnitCostInc;
    //     this.linedata.ins_VatGroup = val.ins_VatGroup;

    //     this.linedata.ins_PurchaseOrderQuantity = val.ins_BalanceQuantity;
    //     // this.goodsreceiptlines.ins_PurchaseOrderQuantity = val.ins_Quantity;
    //     this.linedata.ins_BaseLineNum = val.ins_LineNum;

    //     this.itemdetails.push(val);
    //   }
    // }
  }

  PurchaseOrderEvent(data: any) {

    this.userInfo = this.user.getCurrentUser();
    this.headerForm.patchValue({
      purchaseorderid: data.ins_PurchaseOrderID,
      purchaseorderdocnum: data.ins_DocNum,
      suppliercode: data.ins_SupplierCode,
      suppliername: data.ins_SupplierName,
      deldate: this.datepipe.transform(data.ins_DeliveryDate, 'yyyy-MM-dd'),
      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      owner: this.userInfo.fullName,
    });

    this.itemdetails.length = 0;
    for (var val of data.ins_PurchaseOrderDetails as any) {
      this.linedata = {} as any;

      this.linedata.ins_BranchCode = this.userInfo.branchCode;
      this.linedata.ins_BranchName = this.userInfo.branchName;
      this.linedata.ins_CreatedBy = this.userInfo.fullName;
      this.linedata.ins_InventoryQuantity = val.ins_InventoryQuantity;
      this.linedata.ins_InventoryUom = val.ins_InventoryUom;
      this.linedata.ins_ItemCode = val.ins_ItemCode;
      this.linedata.ins_ItemDescription = val.ins_ItemDescription;
      this.linedata.ins_PurchasePackQuantity = val.ins_PurchasePackQuantity;
      this.linedata.ins_PurchasePackageUom = val.ins_PurchasePackageUom;
      this.linedata.ins_PurchaseUom = val.ins_PurchaseUom;
      this.linedata.ins_Quantity = val.ins_Quantity;
      this.linedata.ins_ReceivedInventoryQuantity = val.ins_ReceivedInventoryQuantity;
      this.linedata.ins_TaxAmount = val.ins_TaxAmount;
      this.linedata.ins_UnitCost = val.ins_UnitCost;
      this.linedata.ins_UnitCostEx = val.ins_UnitCostEx;
      this.linedata.ins_UnitCostInc = val.ins_UnitCostInc;
      this.linedata.ins_VatGroup = val.ins_VatGroup;

      // this.goodsreceiptlines.ins_PurchaseOrderQuantity = val.ins_Quantity;
      // this.goodsreceiptlines.ins_ReceivedQuantity = val.ins_ReceivedQuantity;
      this.linedata.ins_ReceivedQuantity = 0;
      this.linedata.ins_PurchaseOrderQuantity = val.ins_BalanceQuantity;
      this.linedata.ins_BaseLineNum = val.ins_LineNum;

      this.itemdetails.push(this.linedata);
    }
  }

  async onSubmit() {

    this.headerdata.ins_Badge = '';
    this.headerdata.ins_BadgeName = '';

    this.headerdata.ins_GoodsReceiptID = this.headerForm.value.goodsreceiptid;
    this.headerdata.ins_SupplierCode = this.headerForm.value.suppliercode;
    this.headerdata.ins_SupplierName = this.headerForm.value.suppliername;
    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_DocNum = this.headerForm.value.docnum;
    this.headerdata.ins_PostingDate = this.datepipe.transform(
      this.headerForm.value.docdate,
      'yyyy-MM-dd'
    ) as unknown as Date;
    this.headerdata.ins_DeliveryDate = this.datepipe.transform(
      this.headerForm.value.deldate,
      'yyyy-MM-dd'
    ) as unknown as Date;
    this.headerdata.ins_CreatedBy = this.headerForm.value.owner;
    this.headerdata.ins_ReceivedDate = this.datepipe.transform(
      this.headerForm.value.recdate,
      'yyyy-MM-dd'
    ) as unknown as Date;
    this.headerdata.ins_Received = 1;
    this.headerdata.ins_PurchaseOrderDocNum =
      this.headerForm.value.purchaseorderdocnum;
    this.headerdata.ins_PurchaseOrderID = this.headerForm.value.purchaseorderid;

    this.headerdata.ins_GoodsReceiptDetails = this.itemdetails;

    if (this.state == 'add') {
      await this.globalservice.postAuth(
        'GoodsReceipt',
        'PostAsync',
        this.headerdata
      );
    } else {
      this.globalservice.putAuth('GoodsReceipt', '', this.headerdata);
    }

    this.formApproved();
  }

  checkActionAdd() {}

  onCancel() {
    this.outputEvent.emit();
  }

  deleteItem(a: any) {}

  onchange(a: any) {
    const _qty = a.target.value;
    const _recqty = this.itemdetails[a.target.id].ins_ReceivedQuantity;
    const _poqty = this.itemdetails[a.target.id].ins_PurchaseOrderQuantity;
    const _packageqty = this.itemdetails[a.target.id].ins_PurchasePackQuantity;
    const _inventoryqty = _packageqty * _qty;

    if (_poqty < _qty) {
      this.swal.commonSwalCentered(
        'Recieve Quantity is Greater Than PO Quantity',
        'error'
      );
      this.itemdetails[a.target.id].ins_ReceivedQuantity = _recqty;
    } else {
      this.itemdetails[a.target.id].ins_ReceivedQuantity = a.target.value;
      this.itemdetails[a.target.id].ins_ReceivedInventoryQuantity =
        _inventoryqty;
    }
  }

  onLoadForm(status: number) {
    this.state = 'edit';

    switch (status) {
      case 0: // Pending
        this.formPending();
        break;
      case 1: // Approved
        this.formApproved();
        break;
      case 2: // Reject
        this.formRejected();
        break;
      case 3: // Closed
        this.formClosed();
        break;
      default:
        break;
    }
  }

  formDefault() {
    this.isHiddenPrinterBtn = true;
    this.isHiddenSave = false;

    this.isReadOnlyRecDate = false; 
    
    this.isHiddenAction = false;
    this.isHiddenActionRow = false;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isReadOnlyRecDate = false; 
    
    this.isHiddenAction = false;
    this.isHiddenActionRow = false;

    this.badge = 'warning';
    this.badgename = 'PENDING';
  }

  formApproved() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isReadOnlyRecDate = true; 
    
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;

    this.badge = 'success';
    this.badgename = 'RECEIVED';
  }

  formRejected() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isReadOnlyRecDate = true; 
    
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;

    this.badge = 'danger';
    this.badgename = 'REJECTED';
  }

  formCancelled() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isReadOnlyRecDate = true; 
    
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;

    this.badge = 'danger';
    this.badgename = 'CANCELLED';
  }

  formDeleted() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isReadOnlyRecDate = true; 
    
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;

    this.badge = 'danger';
    this.badgename = 'DELETED';
  }

  formClosed() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isReadOnlyRecDate = true; 
    
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;

    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }
}
