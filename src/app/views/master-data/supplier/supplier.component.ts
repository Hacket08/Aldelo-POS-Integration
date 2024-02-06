import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/_services/user.api';
import { UserList } from 'src/app_shared/models/user-list';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Supplier } from 'src/app_shared/models/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  documentType: string = 'Supplier';
  docurl: string = '/master-data/supplier';

  partner: Supplier[] = [];
  visibleUser: Supplier[] = this.partner;


  userInfo: any;
  inputType = 'text';
  datepipe: DatePipe = new DatePipe('en-US');

  
  filterCardCode: string = '';
  filterCardName: string = '';
  filterContactPerson: string = '';
  filterPhone: string = '';


  constructor(private router: Router,
    private user: Users,
    private apiservice: GlobalApiService) { }

  ngOnInit(): void {
    this.view();
  }

  async view() {
    let response: any;

    this.userInfo = this.user.getCurrentUser();
    let userid = this.userInfo.userId;
    let emailAddress = this.userInfo.emailAddress;

    response = await this.apiservice.getDataAsync(this.documentType, 'GetPartner');

    console.log(response);
    this.partner = [];
    for (var v of response) {
      
      let newUser = new Supplier(v.ins_CardCode, v.ins_CardName, v.ins_ContactPerson, v.ins_Position,
                      v.ins_Address1, v.ins_Address2, v.ins_Address3, v.ins_Phone, v.ins_EmailAddress, v.ins_CreatedBy);

      this.partner.push(newUser);
    }

    this.visibleUser = this.partner;
    console.log(this.visibleUser);
  }

  create() {
    this.router.navigate([`${this.docurl}-data-entry`]);
  }

  edit(v: any) {
    this.router.navigate([`${this.docurl}-data-entry/${v.ins_CardCode}`]);
  }

  filterTransactions() {
    this.visibleUser = this.partner.filter(trans =>
      trans.ins_CardCode.toLowerCase().includes(this.filterCardCode.toLowerCase())
      && trans.ins_CardName.toLowerCase().includes(this.filterCardName.toLowerCase())
      && trans.ins_ContactPerson.toLowerCase().includes(this.filterContactPerson.toLowerCase())
      && trans.ins_Phone.toLowerCase().includes(this.filterPhone.toLowerCase())
    );

  }
}
