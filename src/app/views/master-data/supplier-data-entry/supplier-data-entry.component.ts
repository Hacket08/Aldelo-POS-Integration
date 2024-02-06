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


import { Supplier } from 'src/app_shared/models/supplier';
import { UserApprover } from 'src/_model/userapprover';


enum UserAction {
  ADD = 'ADD',
  EDIT = 'EDIT',
}


@Component({
  selector: 'app-supplier-data-entry',
  templateUrl: './supplier-data-entry.component.html',
  styleUrls: ['./supplier-data-entry.component.scss'],
})
export class SupplierDataEntryComponent implements OnInit {
  documentType: string = 'Supplier';
  docurl: string = '/master-data/supplier';

  
  settingHidden: boolean = true;

  decimalPipe: DecimalPipe = new DecimalPipe("en-US");
  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  
  userAction: string = UserAction.ADD;
  approverlist: string = '';
  userInfo: any;
  userApprover: any;

  documentForm = new FormGroup({
    cardcode: new FormControl(''),
    cardname: new FormControl(''),
    contactperson: new FormControl(''),
    position: new FormControl(''),
    address1: new FormControl(''),
    address2: new FormControl(''),
    address3: new FormControl(''),
    phone: new FormControl(''),
    emailaddress: new FormControl(''),
    createdby: new FormControl('')
  });

  cardcode: string = '';
  cardname: string = '';
  contactperson: string = '';
  position: string = '';
  address1: string = '';
  address2: string = '';
  address3: string = '';
  phone: string = '';
  emailaddress: string = '';

  createdby: string = '';
  modifiedby: string = '';
  userid: number = 0;



  headerForm!: FormGroup;
  isViewHidden = false;
  isEditHidden = false;
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
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );
  receivedate = this.datepipe.transform(this.date, 'yyyy-MM-dd');

  badge: string = 'warning';
  badgename: string = 'Pending';

  
  spinnerHidden: boolean = true;
  printerHidden: boolean = true;
  saveHidden: boolean = true;

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
    this.userid = this.userInfo.userId;

  }


  ngOnInit(): void {
    this.activeroute.params.subscribe(params => {
      this.cardcode = params['cardcode']; // Access the route parameter 'id'
    });

    if (this.cardcode != undefined) {
      this.editTransaction(this.cardcode);
    }
    else {
      this.addTransaction();
    }
  }

  async addTransaction() {
    this.userAction = UserAction.ADD;
    let cardcode = await this.apiservice.getDataAsync(this.documentType, 'GetMaxId');
    this.cardcode = cardcode.value;

    this.documentForm.setValue({
      cardcode: this.cardcode,
      cardname: this.cardname,
      contactperson: this.contactperson,
      position:this.position,
      address1: this.address1,
      address2: this.address2,
      address3: this.address3,
      phone: this.phone,
      emailaddress: this.emailaddress,
      createdby: this.createdby
    });

  }

  async editTransaction(cardcode: string) {
    this.userAction = UserAction.EDIT;
    let response = await this.apiservice.getDataAsync(this.documentType, 'GetPartner', cardcode);
    console.log("response", response);

    this.cardcode = response.ins_CardCode;
    this.cardname = response.ins_CardName;
    this.contactperson = response.ins_ContactPerson;
    this.position = response.ins_Position;
    this.address1 = response.ins_Address1;
    this.address2 = response.ins_Address2;
    this.address3 = response.ins_Address3;
    this.phone = response.ins_Phone;
    this.emailaddress = response.ins_EmailAddress;
    this.createdby = response.ins_CreatedBy;

    this.documentForm.patchValue({
      cardcode: this.cardcode,
      cardname: this.cardname,
      contactperson: this.contactperson,
      position:this.position,
      address1: this.address1,
      address2: this.address2,
      address3: this.address3,
      phone: this.phone,
      emailaddress: this.emailaddress,
      createdby: this.createdby,
    });

  }


  async submitTransaction() {
    this.spinnerHidden = false;
    this.saveHidden = true;


    let trans = this.buildTransaction();

    switch (this.userAction) {
      case UserAction.ADD:
        this.apiservice.postData(trans,
          this.documentType,
          'AddPartner'
        ).subscribe((response: any) => {
          this.cardcode = response.ins_CardCode;
          this.router.navigate([`${this.docurl}-data-entry/${this.cardcode}`]);

          this.swal.commonSwalCentered('Supplier Succesfully Added', 'success');

          this.editTransaction(this.cardcode);
          this.spinnerHidden = true;
        })

        break;
      case UserAction.EDIT:
        this.apiservice.postData(trans,
          this.documentType,
          'UpdatePartner'
        ).subscribe((response: any) => {
          this.cardcode = response.ins_CardCode;

          this.router.navigate([`${this.docurl}-data-entry/${this.cardcode}`]);
          this.swal.commonSwalCentered('Supplier Succesfully Updated', 'warning');

          this.editTransaction(this.cardcode);
          this.spinnerHidden = true;
        })


        break;

      default:
        break;
    }



  }


  onDataChange() {
    this.printerHidden = true;
    this.saveHidden = false;
  }

  buildTransaction() {

    let newTransaction = new Supplier(this.cardcode, this.cardname, this.contactperson, this.position
      ,this.address1, this.address2, this.address3, this.phone, this.emailaddress, this.createdby
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
      case 5:
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

  onCancel() {
    // this.outputEvent.emit();
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
