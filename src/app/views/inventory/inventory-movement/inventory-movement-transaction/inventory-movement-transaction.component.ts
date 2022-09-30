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

  docId: number;
  itemList: InventoryMovementLines[] = [];

  constructor(
    private fb: FormBuilder,
    private user: Users,
    private globalservice: GlobalService,

    private headerdata: InventoryMovement,
    private linedata: InventoryMovementLines
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      inventorymovementid: 0,
      branchcode: this.userInfo[0].ins_BranchCode,
      branchname: this.userInfo[0].ins_BranchName,
      docnum: '',
      docdate: this.datepipe.transform(this.postingdate, 'yyyy-MM-dd'),
      createdby: this.userInfo[0].ins_FullName,
      modifiedby: '',
      owner: this.userInfo[0].ins_FullName,
      docstatus: 0,
      remarks: '',
      movementtype: '',
      movementcode: '',
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
    this.isViewHidden = false;
    this.isEditHidden = true;
    this.isReadOnly = false;
    this.state = 'add';

    const _docnum = await this.globalservice.getMaxId('InventoryMovement');
    this.headerForm.patchValue({
      docnum: _docnum,
    });
  }

  async isEditEvent() {
    this.isViewHidden = true;
    this.isEditHidden = false;
    this.isReadOnly = true;
    this.state = 'edit';
    let data: any;

    for (var a of this.dataList as any) {
      console.log("Sample", a);
      this.docId = a.ins_WeeklyOrderID;
      this.onLoadBadge(a.ins_DocStatus, a.ins_IsPOCreated);
    
      this.headerForm = this.fb.group({
        inventorymovementid: a.ins_InventoryMovementID,
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        docnum: a.ins_DocNum,
        docdate: this.datepipe.transform(a.ins_PostingDate, 'yyyy-MM-dd'),

        createdby: a.ins_CreatedBy,
        modifiedby: this.userInfo[0].ins_FullName,
        owner: a.ins_CreatedBy,

        docstatus: a.ins_DocStatus,
        remarks: a.ins_Remarks,
        movementtype: a.ins_MovementType,
        movementcode: a.ins_MovementCode,
      });
  
      let details = a.ins_InventoryMovementLines as any[];
      console.log(details);
      this.itemList.length = 0;
      for (var list of details) {
        this.itemList.push(list);
      }
    }

  }

  onLoadBadge(status: number, pocreated: number) {
    switch (status) {
      case 0: // Pending
        this.isViewHidden = false;
        this.isEditHidden = true;
        this.isReadOnly = false;

        this.badge = 'warning';
        this.badgename = 'PENDING';
        break;
      case 1: // Approved
        this.isHiddenSave = false;
        this.isHiddenAction = true;
        this.isHiddenActionRow = true;
        this.isHiddenAddItem = true;
        this.isHiddenApproveBtn = true;

        this.isHiddenRejectBtn = false;
        this.isHiddenDiv = false;
        this.isHiddenDeleteBtn = true;

        if (pocreated == 1) {
          this.isHiddenRejectBtn = true;
          this.isHiddenDiv = true;
          this.isHiddenSave = true;
        }

        this.badge = 'success';
        this.badgename = 'APPROVED';
        break;
      case 2: // Reject
        this.isHiddenSave = true;
        this.isHiddenAction = true;
        this.isHiddenActionRow = true;
        this.isHiddenAddItem = true;
        this.isHiddenApproveBtn = true;
        this.isHiddenRejectBtn = true;
        this.isHiddenDiv = true;
        this.isHiddenDeleteBtn = true;

        this.badge = 'danger';
        this.badgename = 'REJECTED';
        break;
      case 3: // Close
        this.badge = 'danger';
        this.badgename = 'CLOSED';
        break;
      default:
        break;
    }
  }

  itemSelected(e: Item) {}

  eventAddRow(data: any) {
    this.linedata = new InventoryMovementLines();

    this.linedata.ins_ItemCode = data.ins_ItemCode;
    this.linedata.ins_ItemDescription = data.ins_ItemName;
    this.linedata.ins_InventoryUom = data.ins_InventoryUom;
    this.linedata.ins_InventoryQuantity = 0;

    this.itemList.push(this.linedata);

    console.log(this.itemList);
  }

  async onSubmit() {
    this.headerdata = new InventoryMovement();

    this.headerdata.ins_DocNum = this.headerForm.value.docnum;
    this.headerdata.ins_InventoryMovementID = this.headerForm.value.inventorymovementid;
    this.headerdata.ins_PostingDate = this.headerForm.value.docdate;

    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_CreatedBy = this.headerForm.value.createdby;
    this.headerdata.ins_ModifiedBy = this.headerForm.value.modifiedby;

    this.headerdata.ins_MovementType = this.headerForm.value.movementcode.substring(3);
    this.headerdata.ins_MovementCode = this.headerForm.value.movementcode;
    this.headerdata.ins_Remarks = this.headerForm.value.remarks;

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

    if (this.state == 'add') {
      await this.globalservice.postData(
        'InventoryMovement',
        'PostAsync',
        this.headerdata
      );
    } else {
      this.globalservice.putData(
        'InventoryMovement',
        '',
        this.headerdata
      );
    }

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
    // let data = (await this.purchaseorderservice.docApproved(id)) as any;
  }

  async onReject(id: number) {
    // let data = (await this.purchaseorderservice.docRejected(id)) as any;
  }

}
