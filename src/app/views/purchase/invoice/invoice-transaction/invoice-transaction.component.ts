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

import { Invoice } from 'src/_model/invoice/invoice';
import { InvoiceDetails } from 'src/_model/invoice/invoice-details';

class POItem {
  itemcode: string = '';
  itemname: string = '';
}

@Component({
  selector: 'app-invoice-transaction',
  templateUrl: './invoice-transaction.component.html',
  styleUrls: ['./invoice-transaction.component.scss']
})

export class InvoiceTransactionComponent implements OnInit {
  @Input() dataList: Invoice[] = [];
  @Output() outputEvent = new EventEmitter();
  headerForm!: FormGroup;
  itemdetails: InvoiceDetails[] = [];
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
  isHiddenUnitPrice = false;

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
    private linedata: InvoiceDetails,
    private headerdata: Invoice
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      invoiceid: '',
      suppliercode: '',
      suppliername: '',
      docnum: '',
      deldate: '',
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
    this.userOwner = this.userInfo.fullName;
    this.userApprover = this.user.getCurrentUserApprover();
    const output = (await this.globalservice.getMaxId('Invoices')) as any;

    this.headerForm.patchValue({
      invoiceid: 0,
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

  async isEditEvent() {
    for (var a of this.dataList as any) {
      this.docId = a.ins_InvoiceID;
      this.userOwner = a.ins_CreatedBy;

      this.onLoadForm(a.ins_DocStatus);
      
      this.headerForm.setValue({
        invoiceid: a.ins_InvoiceID,
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

      console.log("dataList", a);
      this.itemdetails.length = 0;
      for (var list of a.ins_InvoiceDetails) {
        this.itemdetails.push(list);
      }
    }
  }

  PassEvent() {
    this.outputEvent.emit();
  }

  ItemEvent(data: any) {
    this.userInfo = this.user.getCurrentUser();

    this.linedata = new InvoiceDetails();
    this.linedata.ins_ItemCode = data.ins_ItemCode;
    this.linedata.ins_ItemDescription = data.ins_ItemName;
    this.linedata.ins_PurchaseUom = data.ins_PurchaseUom;
    this.linedata.ins_VatGroup = data.ins_VatGroup;
    this.linedata.ins_PurchasePackQuantity = data.ins_PurchasePackQuantity;
    this.linedata.ins_PurchasePackageUom = data.ins_PurchasePackageUom;
      (this.linedata.ins_BranchCode = this.userInfo.branchCode),  
      (this.linedata.ins_BranchName = this.userInfo.branchName),
      (this.linedata.ins_CreatedBy = this.userInfo.fullName),
      (this.linedata.ins_InventoryUom = data.ins_InventoryUom);
    this.linedata.ins_BalanceQuantity = 0;
    this.linedata.ins_Quantity = 0;
    this.linedata.ins_UnitPrice = 0;
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

    this.headerdata.ins_InvoiceID = this.headerForm.value.invoiceid;
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
    this.headerdata.ins_InvoiceDetails = this.itemdetails;


    console.log("OnSubmit", this.headerdata);

    if (this.state == 'add') {
      await this.globalservice.postAuth(
        'Invoices',
        'PostAsync',
        this.headerdata
      );
    } else {
      this.globalservice.postAuth('Invoices', 'PutAsync', this.headerdata);
    }

    this.onLoadForm(this.headerForm.value.docstatus);
  }

  deleteItem(i: any) {
    this.itemdetails.splice(i, 1);
  }

  onchange(event: any) {
    const _qty = event.target.value;
    const _packageqty = this.itemdetails[event.target.id].ins_PurchasePackQuantity;
    const _unitprice = this.itemdetails[event.target.id].ins_UnitPrice;
    const _inventoryqty = _packageqty * _qty;
    const _total_amt = _unitprice * _qty;

    this.itemdetails[event.target.id].ins_Quantity = event.target.value;
    this.itemdetails[event.target.id].ins_InventoryQuantity = _inventoryqty;
    this.itemdetails[event.target.id].ins_BalanceQuantity = event.target.value;
    this.itemdetails[event.target.id].ins_TotalAmount = _total_amt;
  }
  
  onchangeprice(event: any) {
    const _unitprice = event.target.value;
    const _qty = this.itemdetails[event.target.id].ins_Quantity;
    const _total_amt = _unitprice * _qty;

    this.itemdetails[event.target.id].ins_UnitPrice = event.target.value;
    this.itemdetails[event.target.id].ins_TotalAmount = _total_amt;
  }

  async onApprove(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 1,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth(
      'Invoices',
      'Status',
      approvalData
    );
    this.onLoadForm(1);

    // let data = (await this.globalservice.docApproved(
    //   'Invoices',
    //   id
    // )) as any;

    // this.formApproved();
  }

  async onReject(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 2,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth(
      'Invoices',
      'Status',
      approvalData
    );
    this.onLoadForm(2);

    // let data = (await this.globalservice.docRejected(
    //   'Invoices',
    //   id
    // )) as any;

    // this.formRejected();
  }

  async onClose(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 3,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth(
      'Invoices',
      'Status',
      approvalData
    );
    this.onLoadForm(3);

    // let data = (await this.globalservice.docClosed(
    //   'Invoices',
    //   id
    // )) as any;
  }

  async onCancel(id: number) {}

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
    this.isHiddenUnitPrice = false;
    
    this.isReadOnlyDeliveryDate = false;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.userInfo = this.user.getCurrentUser();

    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;
    this.isHiddenApproveBtn = false;
    this.isHiddenRejectBtn = false;
    this.isHiddenCancelBtn = true;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;

    this.isHiddenRowQuantity = false;
    this.isHiddenUnitPrice = false;
    this.isReadOnlyDeliveryDate = false;
    this.isHiddenActionRow = false;

    if (this.userInfo.securityLevel !== "1"){
      if (this.userOwner === this.userInfo.fullName) {
        this.isHiddenApproveBtn = true;
        this.isHiddenRejectBtn = true;
        this.isHiddenDiv = true;
      }
      else{
        this.isHiddenRowQuantity = true;
        this.isHiddenUnitPrice = true;
        this.isReadOnlyDeliveryDate = true;
        this.isHiddenActionRow = true;
        this.isHiddenAddItem = true;
      }
    }

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
    this.isHiddenUnitPrice = true;
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
    this.isHiddenUnitPrice = true;
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
