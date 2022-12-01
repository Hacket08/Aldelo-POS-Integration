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
import { Users } from 'src/_services/user.api';
import { GlobalService } from 'src/_shared/api/service';
import { Branch } from '../../../../../_model/branch/branch';

@Component({
  selector: 'app-branch-transaction',
  templateUrl: './branch-transaction.component.html',
  styleUrls: ['./branch-transaction.component.scss'],
})
export class BranchTransactionComponent implements OnInit {
  @Input() dataList: Branch[] = [];
  @Output() outputEvent = new EventEmitter();

  headerForm!: FormGroup;
  isViewHidden = false;
  isEditHidden = false;
  userInfo: any;
  isReadOnly = false;
  state = 'add';

  isHiddenPrinterBtn = false;
  isHiddenSave = false;
  isHiddenAddItem = false;
  isHiddenApproveBtn = false;
  isHiddenRejectBtn = false;
  isHiddenDiv = false;
  isHiddenDeleteBtn = false;
  isHiddenAction = false;

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
    private globalservice: GlobalService,
    private headerdata: Branch
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      branchcode: this.userInfo.BranchCode,
      branchname: this.userInfo.BranchName,
      address: '',
      city: '',
      area: '',
      registernumber: '',
      activationnumber: '',
      hardwarekey: '',
      remarks: '',
      createdby: this.userInfo.FullName,
      modifiedby: '',
      owner: this.userInfo.FullName,
      inactive: 0,
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
    // // const _docnum = await this.globalservice.getMaxId('Branch');
    // this.headerForm.patchValue({
    //   docnum: _docnum,
    // });
  }

  async isEditEvent() {
    for (var a of this.dataList as any) {
      this.onLoadForm(a.ins_InActive);
      this.headerForm = this.fb.group({
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        address: a.ins_Address,
        city: a.ins_City,
        area: a.ins_Area,
        registernumber: a.ins_RegisterNumber,
        activationnumber: a.ins_ActivationNumber,
        hardwarekey: a.ins_HardwareKey,
        remarks: a.ins_Remarks,
        createdby: a.ins_CreatedBy,
        modifiedby: this.userInfo.FullName,
        owner: a.ins_CreatedBy,
        inactive: a.ins_InActive === 1 ? true : false,
      });
    }
  }

  async onSubmit() {
    this.headerdata = new Branch();

    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_Address = this.headerForm.value.address;
    this.headerdata.ins_City = this.headerForm.value.city;
    this.headerdata.ins_Area = this.headerForm.value.area;

    this.headerdata.ins_RegisterNumber = this.headerForm.value.registernumber;
    this.headerdata.ins_ActivationNumber = this.headerForm.value.activationnumber;
    this.headerdata.ins_HardwareKey = this.headerForm.value.hardwarekey;

    this.headerdata.ins_CreatedBy = this.headerForm.value.createdby;
    this.headerdata.ins_ModifiedBy = this.headerForm.value.modifiedby;

    this.headerdata.ins_Remarks = this.headerForm.value.remarks;
    this.headerdata.ins_InActive = this.headerForm.value.inactive === true ? 1 : 0;
    
    if (this.state == 'add') {
      await this.globalservice.postAuth( 'Branch', '', this.headerdata
      );
    } else {
      this.globalservice.putAuth('Branch', '', this.headerdata);
    }

    this.formPending();
  }

  onCancel() {
    this.outputEvent.emit();
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

    this.badge = 'secondary';
    this.badgename = 'New Record';
  }

  formPending() {
    this.isHiddenPrinterBtn = false;
    this.isHiddenSave = true;
    this.isHiddenApproveBtn = false;
    this.isHiddenRejectBtn = false;
    this.isHiddenDiv = false;
    this.isHiddenDeleteBtn = true;


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


    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }
}
