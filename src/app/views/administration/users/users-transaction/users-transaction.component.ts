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
import { UserAccount } from '../../../../../_model/useraccount';
import { UserApprover } from '../../../../../_model/userapprover';

@Component({
  selector: 'app-users-transaction',
  templateUrl: './users-transaction.component.html',
  styleUrls: ['./users-transaction.component.scss']
})
export class UsersTransactionComponent implements OnInit {
  @Input() dataList: UserAccount[] = [];
  @Output() outputEvent = new EventEmitter();
  userapproverlist: UserApprover[] = [];

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
  isHiddenPermissionBtn = false;
  isHiddenDeleteBtn = false;
  isHiddenAction = false;

  // initialized values
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  currentdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');

  badge: string = 'warning';
  badgename: string = 'Pending';

  constructor(
    private fb: FormBuilder,
    private user: Users,
    private globalservice: GlobalService,
    private headerdata: UserAccount,
    private userapprover: UserApprover
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      userid: 0,
      inactive: false,
      useemail: false,

      username: '',
      firstname: '',
      middleinitial: '',
      lastname: '',
      securitylevel: '',
      password: '',
      retrypassword: '',
      emailaddress: '',
      branchcode: this.userInfo.BranchCode,
      branchname: this.userInfo.BranchName,
      fullname: '',

      lastlogindate: this.datepipe.transform(this.currentdate, 'yyyy-MM-dd'),
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
  }

  deleteItem(i: any) {
    this.userapproverlist.splice(i, 1);
    this.onChangeData();
  }

  async isEditEvent() {
    console.log(this.dataList)
    for (var a of this.dataList as any) {
      this.onLoadForm(a.ins_InActive);
      this.headerForm = this.fb.group({
        userid: a.ins_UserID,
        inactive: a.ins_InActive === 1 ? true : false,
        useemail: a.ins_UseEmail === 1 ? true : false,
  
        username: a.ins_UserName,
        firstname: a.ins_FirstName,
        middleinitial: a.ins_MiddleInitial,
        lastname: a.ins_LastName,
        securitylevel: a.ins_SecurityLevel,
        password: a.ins_Password,
        retrypassword: a.ins_RetryPassword,
        emailaddress: a.ins_EmailAddress,
        branchcode: a.ins_BranchCode,
        branchname: a.ins_BranchName,
        fullname: a.ins_FullName,
        
        lastlogindate: this.datepipe.transform(this.currentdate, 'yyyy-MM-dd'),
      });

      this.userapproverlist.length = 0;
      for (var list of a.ins_UserApprover) {
        this.userapproverlist.push(list);
      }
    }
  }

  UserEvent(data: any) {
    const userInfo = this.user.getCurrentUser();
    this.userapprover = new UserApprover();

    this.userapprover.ins_UserID = data.ins_UserID;
    this.userapprover.ins_ApproverUserName = data.ins_UserName;
    this.userapprover.ins_FullName = data.ins_FullName;
    this.userapprover.ins_EmailAddress = data.ins_EmailAddress;
    // this.userapprover.ins_ApprovalLevel = data.ins_ApprovalLevel;

    this.userapproverlist.push(this.userapprover);
    this.onChangeData();
  }

  async onSubmit() {
    this.headerdata = new UserAccount();

    this.headerdata.ins_InActive = this.headerForm.value.inactive === true ? 1 : 0;
    this.headerdata.ins_UseEmail = this.headerForm.value.inactive === true ? 1 : 0;

    this.headerdata.ins_UserName = this.headerForm.value.username;
    this.headerdata.ins_FirstName = this.headerForm.value.firstname;
    this.headerdata.ins_MiddleInitial = this.headerForm.value.middleinitial;
    this.headerdata.ins_LastName = this.headerForm.value.lastname;
    this.headerdata.ins_SecurityLevel = this.headerForm.value.securitylevel;

    this.headerdata.ins_Password = this.headerForm.value.password;
    this.headerdata.ins_RetryPassword = this.headerForm.value.retrypassword;
    this.headerdata.ins_EmailAddress = this.headerForm.value.emailaddress;
    this.headerdata.ins_BranchCode = this.headerForm.value.branchcode;
    this.headerdata.ins_BranchName = this.headerForm.value.branchname;
    this.headerdata.ins_FullName = this.headerForm.value.fullname;

    this.headerdata.ins_LastLoginDate = this.headerForm.value.lastlogindate;
    this.headerdata.ins_UserApprover = this.userapproverlist;

    if (this.state == 'add') {
      await this.globalservice.postAuth('UserAccount', '', this.headerdata);
    } else {
      this.headerdata.ins_UserID = this.headerForm.value.userid;
      await this.globalservice.putAuth('UserAccount', '', this.headerdata);
    }

    console.log(this.headerdata);
    this.formPending();
  }

  onchange(event: any) {
    const _qty = event.target.value;
    this.userapproverlist[event.target.id].ins_ApprovalLevel = event.target.value;
    console.log(this.userapproverlist);
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
    this.isHiddenPermissionBtn = true;
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
    this.isHiddenPermissionBtn = true;
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
    this.isHiddenPermissionBtn = false;
    this.isHiddenDeleteBtn = false;


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
    this.isHiddenPermissionBtn = false;
    this.isHiddenDeleteBtn = false;


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
    this.isHiddenPermissionBtn = true;
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
    this.isHiddenPermissionBtn = true;
    this.isHiddenDeleteBtn = true;


    this.badge = 'danger';
    this.badgename = 'CLOSED';
  }
}
