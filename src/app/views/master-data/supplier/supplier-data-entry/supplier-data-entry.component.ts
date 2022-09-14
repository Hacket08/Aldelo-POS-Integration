import { Component, OnInit } from '@angular/core';
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

  get f() {
    return this.simpleForm.controls;
  }

  onSubmit() {
    console.log(this.simpleForm.value.supplierCode);
    console.log(this.simpleForm.value.supplierName);
    console.log(this.simpleForm.value.contactPerson);
    console.log(this.simpleForm.value.position);
    console.log(this.simpleForm.value.phone);
    console.log(this.simpleForm.value.emailAddress);
    console.log(this.simpleForm.value.address1);
    console.log(this.simpleForm.value.address2);
    console.log(this.simpleForm.value.address3);

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
    // this.supplierInfo.push(this.supplier.suppliercode);
    console.log("this is true" ,this.supplier);
    
    const headers = { 'accept': 'text/plain', 'Content-Type': 'application/json' };
    this.http.post(this.supplierservice.supplier_post(), this.supplier, headers).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
      this.swal.commonSwalCentered('No Data Added Transaction failed!.', 'error');
    })
  }
}
