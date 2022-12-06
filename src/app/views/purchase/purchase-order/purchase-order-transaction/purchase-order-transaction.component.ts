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
import { Supplier } from '../../../../../_model/supplier/supplier';

import { Users } from '../../../../../_services/user.api';
import { PurchaseOrder } from 'src/_model/purchase-order/purchase-order';
import { PurchaseOrderDetails } from 'src/_model/purchase-order/purchase-order-details';

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
  @Input() dataList: PurchaseOrder[] = [];
  @Output() outputEvent = new EventEmitter();
  headerForm!: FormGroup;
  itemdetails: PurchaseOrderDetails[] = [];
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



  constructor(
    private user: Users,
    private globalservice: GlobalService,
    private fb: FormBuilder,
    private linedata: PurchaseOrderDetails,
    private headerdata: PurchaseOrder
  ) {

    this.headerForm = this.fb.group({
      purchaseorderid: '',
      suppliercode: '',
      suppliername: '',
      branchcode: '',
      branchname: '',
      docnum: '',
      docdate: '',
      deldate: '',
      owner: '',
      docstatus: '',
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.dataList.length <= 0) {
      await this.isAddEvent();
    } else {
      await this.isEdit();
    }
  }

  async isAddEvent() {
    this.formDefault();
    this.userInfo = this.user.getCurrentUser();
    this.userApprover = this.user.getCurrentUserApprover();
    const output = await this.globalservice.getMaxId('PurchaseOrders') as any;
    this.headerForm.patchValue({
      purchaseorderid: 0,
      docnum: output.value,
      docdate: this.postingdate,
      deldate: this.deliverydate,
      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      owner: this.userInfo.fullName,
      docstatus: this.userApprover.length > 0 ? 0 : 1,
    });
    console.log(this.headerForm);
  }

  async isEdit() {
    for (var a of this.dataList as any) {
      this.docId = a.ins_PurchaseOrderID;
      this.userOwner = a.ins_CreatedBy;

      this.onLoadForm(a.ins_DocStatus);

      this.headerForm.setValue({
        purchaseorderid: a.ins_PurchaseOrderID,
        suppliercode: a.ins_SupplierCode,
        suppliername: a.ins_SupplierName,
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),
        deldate: this.datepipe.transform(a.ins_DeliveryDate, 'yyyy-MM-dd'),
        owner: a.ins_CreatedBy,
        docstatus: a.ins_DocStatus,
      });

      this.itemdetails.length = 0;
      for (var list of a.ins_PurchaseOrderDetails) {
        this.itemdetails.push(list);
      }
    }
  }

  PassEvent() {
    this.outputEvent.emit();
  }

  ItemEvent(data: any) {
    this.userInfo = this.user.getCurrentUser();

    this.linedata = new PurchaseOrderDetails();
    this.linedata.ins_ItemCode = data.ins_ItemCode;
    this.linedata.ins_ItemDescription = data.ins_ItemName;
    this.linedata.ins_PurchaseUom = data.ins_PurchaseUom;
    this.linedata.ins_VatGroup = data.ins_VatGroup;
    this.linedata.ins_PurchasePackQuantity = data.ins_PurchasePackQuantity;
    this.linedata.ins_PurchasePackageUom = data.ins_PurchasePackageUom;
    this.linedata.ins_BranchCode = this.userInfo.branchCode,
    this.linedata.ins_BranchName = this.userInfo.branchName,
    this.linedata.ins_CreatedBy = this.userInfo.fullName,
    this.linedata.ins_InventoryUom = data.ins_InventoryUom;
    this.linedata.ins_BalanceQuantity = 0;
    this.linedata.ins_Quantity = 0;
    this.linedata.ins_UnitCost = data.ins_PurchasePrice;

    this.itemdetails.push(this.linedata);
  }

  SupplierEvent(data: Supplier) {
    this.suppliers.length = 0;
    this.userInfo = this.user.getCurrentUser();
    this.supplier = data;

    this.headerForm.patchValue({
      suppliercode: this.supplier.ins_SupplierCode,
      suppliername: this.supplier.ins_SupplierName,
      // branchcode: this.userInfo.branchCode,
      // branchname: this.userInfo.branchName,
      // owner: this.userInfo.fullName,
    });
  }

  numericOnly(event: any): boolean {
    let patt = /^[0-9]+(\.[0-9]{1,2})?$/;
    let result = patt.test(event.key);
    return result;
  }

  async onSubmit() {
    
    let approverlist = this.user.getCurrentUserApprover();

    this.headerdata.ins_Badge = '';
    this.headerdata.ins_BadgeName = '';

    this.headerdata.ins_PurchaseOrderID = this.headerForm.value.purchaseorderid;
    this.headerdata.ins_SupplierCode = this.headerForm.value.suppliercode;
    this.headerdata.ins_SupplierName = this.headerForm.value.suppliername;
    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_DocNum = this.headerForm.value.docnum;
    this.headerdata.ins_PostingDate = this.headerForm.value.docdate;
    this.headerdata.ins_DeliveryDate = this.headerForm.value.deldate;
    this.headerdata.ins_CreatedBy = this.headerForm.value.owner;
    this.headerdata.ins_DocStatus = this.headerForm.value.docstatus;
    this.headerdata.ins_ApproverEmailList = approverlist;
    this.headerdata.ins_PurchaseOrderDetails = this.itemdetails;

    if (this.state == 'add') {
      await this.globalservice.postAuth( 'Purchaseorders', 'PostAsync', this.headerdata
      );
    } else {
      this.globalservice.putAuth('Purchaseorders', '', this.headerdata);
    }

    this.formPending();
  }

  deleteItem(i: any) {
    this.itemdetails.splice(i, 1);
  }

  onchange(event: any) {
    const _qty = event.target.value;
    const _packageqty =
      this.itemdetails[event.target.id].ins_PurchasePackQuantity;
    const _inventoryqty = _packageqty * _qty;

    this.itemdetails[event.target.id].ins_Quantity =
      event.target.value;
    this.itemdetails[event.target.id].ins_InventoryQuantity =
      _inventoryqty;
    this.itemdetails[event.target.id].ins_BalanceQuantity =
      event.target.value;
  }

  async onApprove(id: number) {
    let data = (await this.globalservice.docApproved(
      'PurchaseOrders',
      id
    )) as any;

    this.formApproved();
  }

  async onReject(id: number) {
    let data = (await this.globalservice.docRejected(
      'PurchaseOrders',
      id
    )) as any;

    this.formRejected();
  }

  async onClose(id: number) {
    let data = (await this.globalservice.docClosed(
      'PurchaseOrders',
      id
    )) as any;
  }

  async onCancel(id: number) {

  }

  onChangeData() {
    this.isHiddenPrinterBtn = true;

    this.isHiddenSave = false;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;
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
    this.state = 'add';

    this.isHiddenPrinterBtn = true;
    this.isHiddenSave = false;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenCancelBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = false;
    this.isReadOnlyDeliveryDate = false;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.userInfo = this.user.getCurrentUser();
    if (this.userOwner === this.userInfo.fullName) {
      this.isHiddenApproveBtn = true;
      this.isHiddenRejectBtn = true;
      this.isHiddenCancelBtn = false;

      
      this.isHiddenRowQuantity = false;
      this.isReadOnlyDeliveryDate = false;
      this.isHiddenActionRow = false;
    }
    else
    {
      this.isHiddenCancelBtn = true;
      this.isHiddenApproveBtn = false;
      this.isHiddenRejectBtn = false;

      
      this.isHiddenRowQuantity = true;
      this.isReadOnlyDeliveryDate = true;
      this.isHiddenActionRow = true;
    }

    if (this.userInfo.securityLevel === "1") {
      this.isHiddenCancelBtn = true;
      this.isHiddenApproveBtn = false;
      this.isHiddenRejectBtn = false;

      
      this.isHiddenRowQuantity = false;
      this.isReadOnlyDeliveryDate = false;
      this.isHiddenActionRow = false;
    } 

    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;


    this.badge = 'warning';
    this.badgename = 'PENDING';
  }

  formApproved() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;

    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;

    this.isHiddenRejectBtn = false;
    this.isHiddenCancelBtn = true;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = true;
    this.isReadOnlyDeliveryDate = true;

    this.badge = 'success';
    this.badgename = 'APPROVED';
  }

  formRejected() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;

    this.isHiddenRejectBtn = true;
    this.isHiddenCancelBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = true;
    this.isReadOnlyDeliveryDate = true;

    this.badge = 'danger';
    this.badgename = 'REJECTED';
  }

  formClosed() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenActionRow = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }
}
