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
import { Users } from 'src/_services/user.api';
import { GlobalService } from 'src/_shared/api/service';

import { InventoryMovement } from 'src/_model/inventory-movement/inventory-movement';
import { InventoryMovementLines } from 'src/_model/inventory-movement/inventory-movement-lines';

@Component({
  selector: 'app-inventory-movement-transaction',
  templateUrl: './inventory-movement-transaction.component.html',
  styleUrls: ['./inventory-movement-transaction.component.scss'],
})
export class InventoryMovementTransactionComponent implements OnInit {
  @Input() dataList: InventoryMovement[] = [];
  @Output() outputEvent = new EventEmitter();

  headerForm!: FormGroup;
  isViewHidden = false;
  isEditHidden = false;

  // Header Data
  userInfo: any;
  userApprover: any;
  userOwner: any;
  docId: number;
  state = 'add';

  
  isHiddenPrinterBtn = false;
  isHiddenSave = false;
  isHiddenAddItem = false;
  isHiddenApproveBtn = false;
  isHiddenRejectBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;

  isDisableType = false;
  isReadOnlyRemarks = false;
  isHiddenAction = false;
  isHiddenActionRow = false;
  isHiddenRowQuantity = false;

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

  itemList: InventoryMovementLines[] = [];

  constructor(
    private fb: FormBuilder,
    private user: Users,
    private globalservice: GlobalService,
    public swal: SwalService,
    private headerdata: InventoryMovement,
    private linedata: InventoryMovementLines
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      inventorymovementid: 0,
      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      docnum: '',
      docdate: this.datepipe.transform(this.postingdate, 'yyyy-MM-dd'),
      createdby: this.userInfo.fullName,
      modifiedby: '',
      owner: this.userInfo.fullName,
      docstatus: 0,
      remarks: '',
      movementtype: { value: '', disabled: this.isDisableType },
      movementcode: { value: '', disabled: this.isDisableType },
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
    const output = await this.globalservice.getMaxId('InventoryMovement') as any;

    this.headerForm.patchValue({
      docnum: output.value,
      branchcode: this.userInfo.branchCode,
      branchname: this.userInfo.branchName,
      owner: this.userInfo.fullName,
      docstatus: this.userApprover.length > 0 ? 0 : 1,
      approvedby: this.userApprover.length > 0 ? this.userInfo.fullName : '',
    });
  }

  async isEditEvent() {
    for (var a of this.dataList as any) {
      this.userInfo = this.user.getCurrentUser();
      console.log("Sample", a);
      this.userOwner = a.ins_CreatedBy;
      this.docId = a.ins_InventoryMovementID;
    
      this.headerForm = this.fb.group({
        inventorymovementid: a.ins_InventoryMovementID,
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),

        createdby: a.ins_CreatedBy,
        modifiedby:  this.userInfo.fullName,
        owner: a.ins_CreatedBy,

        docstatus: a.ins_DocStatus,
        remarks: a.ins_Remarks,
        movementtype: { value: a.ins_MovementType, disabled: this.isDisableType },
        movementcode: { value: a.ins_MovementCode, disabled: this.isDisableType },
      });
  
      let details = a.ins_InventoryMovementLines as any[];
      console.log(details);
      this.itemList.length = 0;
      for (var list of details) {
        this.itemList.push(list);
      }

      this.onLoadForm(a.ins_DocStatus);
    }

  }



  itemSelected(e: Item) {}

  ItemEvent(data: any) {
    this.userInfo = this.user.getCurrentUser();
    this.linedata = new InventoryMovementLines();

    this.linedata.ins_ItemCode = data.ins_ItemCode;
    this.linedata.ins_ItemDescription = data.ins_ItemName;
    this.linedata.ins_InventoryUom = data.ins_InventoryUom;
    this.linedata.ins_InventoryQuantity = 0;
    this.linedata.ins_BranchCode = this.userInfo.branchCode,
    this.linedata.ins_BranchName = this.userInfo.branchName,
    this.linedata.ins_CreatedBy = this.userInfo.fullName,

    this.itemList.push(this.linedata);

    this.onChangeData();
    // console.log(this.itemList);
  }

  async onSubmit() {
    // debugger;
    let approverlist = this.user.getCurrentUserApprover();
    this.headerdata = new InventoryMovement();

    this.headerdata.ins_DocNum = this.headerForm.value.docnum;
    this.headerdata.ins_InventoryMovementID = this.headerForm.value.inventorymovementid;
    this.headerdata.ins_PostingDate = this.headerForm.value.docdate;

    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_CreatedBy = this.headerForm.value.createdby;
    this.headerdata.ins_ModifiedBy = this.headerForm.value.modifiedby;
    this.headerdata.ins_ApprovedBy = this.headerForm.value.approvedby;
    
    this.headerdata.ins_MovementType = this.headerForm.value.movementcode.substring(3);
    this.headerdata.ins_MovementCode = this.headerForm.value.movementcode;
    this.headerdata.ins_Remarks = this.headerForm.value.remarks;
    this.headerdata.ins_DocStatus = this.headerForm.value.docstatus;
    this.headerdata.ins_ApproverEmailList = approverlist;

    let items = [];
    for (var item of this.itemList) {
      item.ins_BranchCode = this.headerForm.value.branchcode;
      item.ins_BranchName = this.headerForm.value.branchname;
      item.ins_CreatedBy = this.headerForm.value.createdby;
      item.ins_ModifiedBy = this.headerForm.value.modifiedby;
      item.ins_MovementType = this.headerForm.value.movementcode.substring(3);
      item.ins_MovementCode = this.headerForm.value.movementcode;

      items.push(item);
    }

    this.headerdata.ins_InventoryMovementLines = items;
    console.log(this.headerdata);

    if (this.headerdata.ins_MovementType == "") {
      this.swal.commonSwalCentered(
        'Movement Type Not Defined',
        'error'
      );
      return;
    }

    if (this.state == 'add') {
      await this.globalservice.postAuth(
        'InventoryMovement',
        'PostAsync',
        this.headerdata
      );
    } else {
      this.globalservice.postAuth(
        'InventoryMovement',
        'PutAsync',
        this.headerdata
      );
    }
    this.onLoadForm(this.headerdata.ins_DocStatus);
  }

  deleteItem(i: any) {
    this.itemList.splice(i, 1);
  }

  onCancel() {
    this.outputEvent.emit();
  }

  onchange(a: any) {
    const _qty = a.target.value;
    this.itemList[a.target.id].ins_InventoryQuantity = _qty;
  }

  async onApprove(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 1,
      DocId: id,
      RejectComment: '',
    };
    let data = await this.globalservice.postAuth('InventoryMovement', 'Status', approvalData);
    this.onLoadForm(1);
    // let data = (await this.globalservice.docApproved(
    //   'InventoryMovement',
    //   id
    // )) as any;
  }

  async onReject(id: number) {
    this.userInfo = this.user.getCurrentUser();
    const approvalData = {
      ApproverEmail: this.userInfo.emailAddress,
      Status: 2,
      DocId: id,
      RejectComment: 'Document is Rejected',
    };
    let data = await this.globalservice.postAuth('InventoryMovement', 'Status', approvalData);
    this.onLoadForm(2);
    // let data = (await this.globalservice.docRejected(
    //   'InventoryMovement',
    //   id
    // )) as any;
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
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isDisableType = false;
    this.isReadOnlyRemarks = false;
    this.isHiddenActionRow = false;
    this.isHiddenRowQuantity = false;

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.userInfo = this.user.getCurrentUser();

    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;

    this.isHiddenApproveBtn = false;
    this.isHiddenRejectBtn = false;
    this.isHiddenDiv = false;

    this.isHiddenDeleteBtn = true;

    this.isDisableType = false;
    this.isReadOnlyRemarks = false;
    this.isHiddenActionRow = false;
    this.isHiddenRowQuantity = false;

    if (this.userInfo.securityLevel !== "1") {
      if (this.userOwner !== this.userInfo.fullName) {
        this.isHiddenApproveBtn = false;
        this.isHiddenRejectBtn = false;
        this.isHiddenDiv = false;
  
  
        this.isDisableType = true;
        this.isReadOnlyRemarks = true;
        this.isHiddenActionRow = true;
        this.isHiddenRowQuantity = true;

        this.headerForm.get('movementtype').disable();
        this.headerForm.get('movementcode').disable();
      } else {
        this.isHiddenApproveBtn = true;
        this.isHiddenRejectBtn = true;
        this.isHiddenDiv = true;

        this.headerForm.get('movementtype').enable();
        this.headerForm.get('movementcode').enable();
      }
    }

    this.badge = 'warning';
    this.badgename = 'PENDING';
  }

  formApproved() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;

    this.isHiddenRejectBtn = false;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;

    this.isDisableType = true;
    this.isReadOnlyRemarks = true;
    this.isHiddenActionRow = true;
    this.isHiddenRowQuantity = true;


    if (this.userInfo.securityLevel !== "1") {
      if (this.userOwner === this.userInfo.fullName) {
        this.isHiddenApproveBtn = true;
        this.isHiddenRejectBtn = true;
        this.isHiddenDiv = true;

        this.headerForm.get('movementtype').enable();
        this.headerForm.get('movementcode').enable();
      }
    }



    this.headerForm.get('movementtype').disable();
    this.headerForm.get('movementcode').disable();
    this.badge = 'success';
    this.badgename = 'APPROVED';
  }

  formRejected() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;

    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    this.isDisableType = true;
    this.isReadOnlyRemarks = true;
    this.isHiddenActionRow = true;
    this.isHiddenRowQuantity = true;

    this.headerForm.get('movementtype').disable();
    this.headerForm.get('movementcode').disable();

    this.badge = 'danger';
    this.badgename = 'REJECTED';
  }

  formClosed() {
    this.isHiddenSave = true;
    this.isHiddenAction = true;
    this.isHiddenAddItem = true;
    this.isHiddenApproveBtn = true;
    this.isHiddenRejectBtn = true;
    this.isHiddenDiv = true;
    this.isHiddenDeleteBtn = true;

    
    this.isDisableType = true;
    this.isReadOnlyRemarks = true;
    this.isHiddenActionRow = true;
    this.isHiddenRowQuantity = true;

    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }
}
