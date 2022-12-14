import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../../../_services/swal-service';
import { ApiHttpService } from '../../../../../_services/api-http.service';

import {
  Supplier,
  SupplierList,
} from '../../../../../_model/supplier/supplier';
import { SupplierApi } from '../../../../../_shared/supplier/supplier.api';

@Component({
  selector: 'app-supplier-data-entry',
  templateUrl: './supplier-data-entry.component.html',
  styleUrls: ['./supplier-data-entry.component.scss'],
})
export class SupplierDataEntryComponent implements OnInit {
  @Output() passedDataEvent = new EventEmitter();
  @Input() supplierData: Supplier[] = [];

  data: Supplier[] = [];

  datepipe: DatePipe = new DatePipe('en-US');
  postingdate = this.datepipe.transform(new Date(), 'MM/dd/YYYY');

  simpleForm!: FormGroup;
  supplierInfo: any[] = [];

  constructor(
    private fb: FormBuilder,
    public swal: SwalService,
    public http: ApiHttpService,
    public supplier: Supplier,
    public supplierapi: SupplierApi
  ) {
    this.simpleForm = this.fb.group({
      supplierCode: [],
      supplierName: [],
      contactPerson: [],
      position: [],
      phone: [],
      emailAddress: [],
      address1: [],
      address2: [],
      address3: [],
      inactive: 0,
    });
  }

  ngOnInit(): void {
    for (var a of this.supplierData as any) {
      this.simpleForm.reset();
      this.simpleForm.setValue({
        supplierCode: a.ins_SupplierCode,
        supplierName: a.ins_SupplierName,
        contactPerson: a.ins_ContactPerson,
        position: a.ins_Position,
        phone: a.ins_Phone,
        emailAddress: a.ins_EmailAddress,
        address1: a.ins_Address1,
        address2: a.ins_Address2,
        address3: a.ins_Address3,
        inactive: a.ins_InActive === 1 ? true : false,
      });
    }
  }

  async loadData(a: any) {
    this.simpleForm.setValue({
      supplierCode: a.ins_SupplierCode,
      supplierName: a.ins_SupplierName,
      contactPerson: a.ins_ContactPerson,
      position: a.ins_Position,
      phone: a.ins_Phone,
      emailAddress: a.ins_EmailAddress,
      address1: a.ins_Address1,
      address2: a.ins_Address2,
      address3: a.ins_Address3,
      inactive: a.ins_InActive === 1 ? true : false,
    });
  }

  PassEvent() {
    this.passedDataEvent.emit();
  }

  get f() {
    return this.simpleForm.controls;
  }

  onSubmit() {
    this.supplier.ins_SupplierCode = this.simpleForm.value.supplierCode;
    this.supplier.ins_SupplierName = this.simpleForm.value.supplierName;
    this.supplier.ins_ContactPerson = this.simpleForm.value.contactPerson;
    this.supplier.ins_Position = this.simpleForm.value.position;
    this.supplier.ins_Phone = this.simpleForm.value.phone;
    this.supplier.ins_EmailAddress = this.simpleForm.value.emailAddress;
    this.supplier.ins_Address1 = this.simpleForm.value.address1;
    this.supplier.ins_Address2 = this.simpleForm.value.address2;
    this.supplier.ins_Address3 = this.simpleForm.value.address3;
    this.supplier.ins_InActive = this.simpleForm.value.inactive === true ? 1 : 0;

    if (this.checkActionAdd() == true) {
      this.supplierapi.post_supplier(this.supplier);
    } else {
      this.supplierapi.put_supplier(this.supplier);
    }

    this.passedDataEvent.emit();
  }

  checkActionAdd() {
    if (this.supplierData.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}
