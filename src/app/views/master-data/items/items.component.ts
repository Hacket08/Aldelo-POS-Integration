import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/_services/user.api';
import { UserList } from 'src/app_shared/models/user-list';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  documentType: string = 'UserAccount';
  docurl: string = '/administration/users';

  users: UserList[] = [];
  visibleUser: UserList[] = this.users;


  userInfo: any;
  inputType = 'text';
  datepipe: DatePipe = new DatePipe('en-US');

  
  filterUsername: string = '';
  filterBranchName: string = '';
  filterRoleName: string = '';
  filterEmailAddress: string = '';
  filterFullName: string = '';

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

    response = await this.apiservice.getDataAsync(this.documentType, 'GetUser');

    console.log(response);
    this.users = [];
    for (var v of response) {
      
      let newUser = new UserList(v.ins_Id, v.ins_UserName, v.ins_FullName, v.ins_EmailAddress, v.ins_BranchCode,
          v.ins_BranchName, v.ins_RoleCode, v.ins_RoleName );

      this.users.push(newUser);
    }

    this.visibleUser = this.users;
    console.log(this.visibleUser);
  }

  create() {
    this.router.navigate([`${this.docurl}-transaction`]);
  }

  edit(v: any) {
    this.router.navigate([`${this.docurl}-transaction/${v.ins_Id}`]);
  }

  filterTransactions() {
    this.visibleUser = this.users.filter(trans =>
      trans.ins_UserName.toLowerCase().includes(this.filterUsername.toLowerCase())
      && trans.ins_FullName.toLowerCase().includes(this.filterFullName.toLowerCase())
      && trans.ins_EmailAddress.toLowerCase().includes(this.filterEmailAddress.toLowerCase())
      && trans.ins_RoleName.toLowerCase().includes(this.filterRoleName.toLowerCase())
      && trans.ins_BranchName.toLowerCase().includes(this.filterBranchName.toLowerCase())
    );

  }
}

