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
import { Supplier } from '../../../../../_model/supplier/supplier';

@Component({
  selector: 'app-supplier-data-entry',
  templateUrl: './supplier-data-entry.component.html',
  styleUrls: ['./supplier-data-entry.component.scss'],
})
export class SupplierDataEntryComponent implements OnInit {
  @Input() dataList: Supplier[] = [];
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
    private headerdata: Supplier
  ) {
    this.userInfo = this.user.getCurrentUser();
    this.headerForm = this.fb.group({
      suppliercode: [],
      suppliername: [],
      contactperson: [],
      position: [],
      phone: [],
      emailaddress: [],
      address1: [],
      address2: [],
      address3: [],
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
      this.headerForm.reset();
      this.headerForm = this.fb.group({
        suppliercode: a.ins_SupplierCode,
        suppliername: a.ins_SupplierName,
        contactperson: a.ins_ContactPerson,
        position: a.ins_Position,
        phone: a.ins_Phone,
        emailaddress: a.ins_EmailAddress,
        address1: a.ins_Address1,
        address2: a.ins_Address2,
        address3: a.ins_Address3,
        inactive: a.ins_InActive === 1 ? true : false,
      });
    }
  }

  async onSubmit() {
    this.headerdata = new Supplier();

    this.headerdata.ins_SupplierCode = this.headerForm.value.suppliercode;
    this.headerdata.ins_SupplierName = this.headerForm.value.suppliername;
    this.headerdata.ins_ContactPerson = this.headerForm.value.contactperson;
    this.headerdata.ins_Position = this.headerForm.value.position;
    this.headerdata.ins_Phone = this.headerForm.value.phone;
    this.headerdata.ins_EmailAddress = this.headerForm.value.emailaddress;
    this.headerdata.ins_Address1 = this.headerForm.value.address1;
    this.headerdata.ins_Address2 = this.headerForm.value.address2;
    this.headerdata.ins_Address3 = this.headerForm.value.address3;
    this.headerdata.ins_InActive = this.headerForm.value.inactive === true ? 1 : 0;

    if (this.state == 'add') {
      await this.globalservice.postAuth( 'Supplier', 'PostAsync', this.headerdata
      );
    } else {
      this.globalservice.postAuth('Supplier', 'PutAsync', this.headerdata);
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
