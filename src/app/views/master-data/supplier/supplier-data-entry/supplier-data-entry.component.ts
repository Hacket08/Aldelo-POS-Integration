import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalService } from '../../../../../_services/swal-service';
import { ApiHttpService } from '../../../../../_services/api-http.service';

import { Supplier } from '../../../../shared/supplier/supplier';
import { SupplierServices } from '../../../../../_services/supplier.service';

@Component({
  selector: 'app-supplier-data-entry',
  templateUrl: './supplier-data-entry.component.html',
  styleUrls: ['./supplier-data-entry.component.scss'],
})
export class SupplierDataEntryComponent implements OnInit {
  @Input() childPost: any[] = [];
  @Output() passedEvent = new EventEmitter();
  datepipe: DatePipe = new DatePipe('en-US');
  postingdate = this.datepipe.transform(new Date(), 'MM/dd/YYYY');

  simpleForm!: FormGroup;
  supplierInfo: any[] = [];

  constructor(
    private fb: FormBuilder,
    public swal: SwalService,
    public http: ApiHttpService,
    public supplier: Supplier,
    public supplierservice: SupplierServices
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
    });
  }

  ngOnInit(): void {}

  PassEvent() {
    this.passedEvent.emit();
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
    this.supplier.ins_InActive = 0;

    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json' };
    this.http.post(this.supplierservice.supplier_post(), this.supplier, headers).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
      this.swal.commonSwalCentered('No Data Added Transaction failed!.', 'error');
    })

    this.passedEvent.emit();
  }


}
