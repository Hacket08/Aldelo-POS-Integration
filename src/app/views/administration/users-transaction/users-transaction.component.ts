import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

import { Users } from 'src/_services/user.api';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { ItemUomSelection } from "src/app_shared/models/item-uom-selection";
import { ItemTransactionLine } from "src/app_shared/models/item-transaction-line";
import { Transaction } from "src/app_shared/models/transaction";
import { TransactionApproval } from "src/app_shared/models/transaction-approval";
import { TransactionLine } from 'src/app_shared/models/transaction-line';
import { SwalService } from 'src/_services/swal-service';
import Swal from 'sweetalert2';
import { ObjectType } from 'src/app_shared/enums/object-type';

import { UserAccount } from 'src/app_shared/models/user-account';
import { UserSupplier } from 'src/app_shared/models/user-supplier';
import { UserBranch } from 'src/app_shared/models/user-branch';

import { UserApprover } from '../../../../_model/userapprover';

enum UserAction {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

@Component({
  selector: 'app-users-transaction',
  templateUrl: './users-transaction.component.html',
  styleUrls: ['./users-transaction.component.scss']
})
export class UsersTransactionComponent implements OnInit {

  documentType: string = 'UserAccount';
  docurl: string = '/administration/users';

  settingHidden: boolean = true;

  decimalPipe: DecimalPipe = new DecimalPipe("en-US");
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  docdateInputType = 'text';
  duedateInputType = 'text';

  approverLines: UserApprover[] = [];
  userSupplier: UserSupplier[] = [];
  userBranch: UserBranch[] = [];

  documentForm = new FormGroup({
    userid: new FormControl(''),
    inactive: new FormControl(''),
    allowsupplier: new FormControl(''),
    allowbranch: new FormControl(''),
    useemail: new FormControl(''),

    username: new FormControl(''),
    firstname: new FormControl(''),
    middleinitial: new FormControl(''),
    lastname: new FormControl(''),
    securitylevel: new FormControl(''),
    password: new FormControl(''),
    retrypassword: new FormControl(''),
    emailaddress: new FormControl(''),
    branchcode: new FormControl(''),
    branchname: new FormControl(''),
    fullname: new FormControl(''),
    rolecode: new FormControl(''),
    rolename: new FormControl('')
  });

  userAction: string = UserAction.ADD;
  userInfo: any;
  userApprover: any;
  createdby: string = '';
  modifiedby: string = '';
  approvedby: string = '';
  approveduserid: number;
  // userid: number;
  approverlist: string = '';

  branchcode: string = '';
  branchname: string = '';
  rolecode: string = '';
  rolename: string = '';

  username: string = '';
  firstname: string = '';
  middleinitial: string = '';
  lastname: string = '';
  securitylevel: string = '';
  password: string = '';
  retrypassword: string = '';
  emailaddress: string = '';
  fullname: string = '';

  
  inactive: boolean = false;
  allowsupplier: boolean = false;
  allowbranch: boolean = false;

  badge: string = '';
  badgename: string = '';

  userid: string = '';

  // Actions
  spinnerHidden: boolean = true;
  printerHidden: boolean = true;
  saveHidden: boolean = true;
  deleteHidden: boolean = true;
  permissionHidden: boolean = true;
  backToListHidden: boolean = false;


  branchDisable: boolean = false;
  supplierDisable: boolean = false;

  constructor(private activeroute: ActivatedRoute,
    private router: Router,
    private apiservice: GlobalApiService,
    private user: Users,
    private swal: SwalService,
  ) {

    this.userInfo = this.user.getCurrentUser();
    this.approverlist = this.user.getCurrentUserApprover();

    this.createdby = this.userInfo.fullName;
    this.modifiedby = this.userInfo.fullName;
    // this.userid = this.userInfo.userId;

  }



  ngOnInit(): void {
    this.activeroute.params.subscribe(params => {
      this.userid = params['userid']; // Access the route parameter 'id'
    });

    if (this.userid != undefined) {
      this.editTransaction(this.userid);
    }
    else {
      this.addTransaction();
    }
  }


  async addTransaction() {
    this.userAction = UserAction.ADD;

    this.documentForm.setValue({
      userid: this.userid,
      inactive: this.inactive,
      allowsupplier: this.allowsupplier,
      allowbranch: this.allowbranch,
      username: this.username,
      firstname: this.firstname,
      middleinitial: this.middleinitial,
      lastname: this.lastname,
      fullname: this.fullname,
      securitylevel: this.securitylevel,
      password: this.password,
      retrypassword: this.retrypassword,
      emailaddress: this.emailaddress,
      branchcode: this.branchcode,
      branchname: this.branchname,
      rolecode: this.rolecode,
      rolename: this.rolename
    });

  }

  async editTransaction(userid: string) {
    this.userAction = UserAction.EDIT;
    let response = await this.apiservice.getDataAsync(this.documentType, 'GetUser', userid);
    console.log("response", response);


    this.userid = userid;
    this.inactive = (response.ins_InActive === 1) ? true : false;
    this.username = response.ins_UserName;
    this.firstname = response.ins_FirstName;
    this.middleinitial = response.ins_MiddleInitial;
    this.lastname = response.ins_LastName;
    this.fullname = response.ins_FullName;

    this.emailaddress = response.ins_EmailAddress;
    this.securitylevel = response.ins_SecurityLevel;

    this.password = response.ins_Password;
    this.retrypassword = response.ins_RetryPassword;


    this.branchcode = response.ins_BranchCode;
    this.branchname = response.ins_BranchName;
    this.rolecode = response.ins_RoleCode;
    this.rolename = response.ins_RoleName;

    this.supplierDisable = this.allowsupplier = (response.ins_AllowAllSupplier === 1) ? true : false;
    this.branchDisable = this.allowbranch = (response.ins_AllowAllBranch === 1) ? true : false;


    this.documentForm.patchValue({
      userid: this.userid,
      inactive: this.inactive,
      allowsupplier: this.allowsupplier,
      allowbranch: this.allowbranch,
      username: this.username,

      firstname: this.firstname,
      middleinitial: this.middleinitial,
      lastname: this.lastname,
      fullname: this.fullname,
      emailaddress: this.emailaddress,

      securitylevel: this.securitylevel,
      password: this.password,
      retrypassword: this.retrypassword,
      branchcode: this.branchcode,
      branchname: this.branchname,
      rolecode: this.rolecode,
      rolename: this.rolename
    });


    this.userSupplier = [];
    for (var v of response.ins_UserSupplier) {

      console.log("v", v);
      let useraccountid = v.ins_UserAccountID;
      let cardcode = v.ins_CardCode;
      let cardname = v.ins_CardName;
      let linenum = v.ins_LineNum;

      let newSupplier = new UserSupplier(useraccountid, cardcode, cardname, linenum);
      this.userSupplier.push(newSupplier);
    }


    this.userBranch = [];
    for (var v of response.ins_UserBranch) {

      console.log("v", v);
      let useraccountid = v.ins_UserAccountID;
      let branchcode = v.ins_BranchCode;
      let branchname = v.ins_BranchName;
      let linenum = v.ins_LineNum;

      let newBranch = new UserBranch(useraccountid, branchcode, branchname, linenum);
      this.userBranch.push(newBranch);
    }

  }


  async submitTransaction() {
    this.spinnerHidden = false;
    this.saveHidden = true;


    let trans = this.buildTransaction();

    console.log(trans);
    
    switch (this.userAction) {
      case UserAction.ADD:
        this.apiservice.postData(trans,
          this.documentType,
          'AddUser'
        ).subscribe((response: any) => {
          this.userid = response.ins_UserAccountID;
          this.router.navigate([`${this.docurl}-transaction/${this.userid}`]);

          this.swal.commonSwalCentered('User Succesfully Added', 'success');
          this.editTransaction(this.userid);
          this.spinnerHidden = true;
        })

        break;
      case UserAction.EDIT:


        this.apiservice.postData(trans,
          this.documentType,
          'UpdateUser'
        ).subscribe((response: any) => {
          this.userid = response.ins_UserAccountID;

          this.router.navigate([`${this.docurl}-transaction/${this.userid}`]);
          this.swal.commonSwalCentered('Transaction Succesfully Updated', 'warning');
          this.editTransaction(this.userid);
          this.spinnerHidden = true;
        })


        break;

      default:
        break;
    }



  }

  buildTransaction() {

    let usersupplier: UserSupplier[] = [];
    let index = 0;
    for (var v of this.userSupplier) {
      let newsupplier = new UserSupplier(
        v.ins_UserAccountID, v.ins_CardCode, v.ins_CardName, index
      );

      usersupplier.push(newsupplier);
      index++;
    }


    let userbranch: UserBranch[] = [];
    index = 0;
    for (var x of this.userBranch) {
      let newbranch = new UserBranch(
        x.ins_UserAccountID, x.ins_BranchCode, x.ins_BranchName, index
      );

      userbranch.push(newbranch);
      index++;
    }

    let newTransaction = new UserAccount(this.userid, ((this.inactive) ? 1 : 0), this.username, this.firstname, this.middleinitial, this.lastname, this.fullname ,
      this.securitylevel, this.password, this.retrypassword, 
      this.emailaddress, this.branchcode, this.branchname, 
      this.rolecode, this.rolename, ((this.allowsupplier) ? 1 : 0), ((this.allowbranch) ? 1 : 0), usersupplier, userbranch
    );

    return newTransaction;
  }


  actionClick(actionid: number) {
    switch (actionid) {
      case 9:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case -9:
        break;
      case -8:
        break;
      case -1:
        this.BackToList();
        break;
      default:
        break;
    }
  }


  BackToList() {
    this.router.navigate([this.docurl]);
  }

  onDataChange() {
    this.printerHidden = true;
    this.saveHidden = false;

    this.supplierDisable = this.allowsupplier;
    this.branchDisable = this.allowbranch;
  }

  onItemRemove(index: any) {
    this.approverLines.splice(index, 1);
  }

  BranchEvent(val: any) {
    this.documentForm.patchValue({
      branchcode: val.ins_BranchCode,
      branchname: val.ins_BranchName,
    });
    this.onDataChange();
  }

  RoleEvent(val: any) {
    this.documentForm.patchValue({
      rolecode: val.ins_RoleCode,
      rolename: val.ins_RoleName,
    });
    this.onDataChange();
  }

  
  PartnerEvent(val: any) {
    let useraccountid = val.ins_UserAccountID;
    let cardcode = val.ins_CardCode;
    let cardname = val.ins_CardName;
    let newSupplier = new UserSupplier(useraccountid, cardcode, cardname, 0);

    this.userSupplier.push(newSupplier);
    this.onDataChange();
  }

  onPartnerRemove(index: any) {

    this.userSupplier.splice(index, 1);
    this.onDataChange();
  }

  
  BranchListEvent(val: any) {
    let useraccountid = val.ins_UserAccountID;
    let branchcode = val.ins_BranchCode;
    let branchname = val.ins_BranchName;
    let newBranch = new UserBranch(useraccountid, branchcode, branchname, 0);

    this.userBranch.push(newBranch);
    this.onDataChange();
  }

  onBranchRemove(index: any) {

    this.userBranch.splice(index, 1);
    this.onDataChange();
  }
}
