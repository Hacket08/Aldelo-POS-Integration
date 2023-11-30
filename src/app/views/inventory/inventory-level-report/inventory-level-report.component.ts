import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../_services/user.api';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { Branch } from '../../../../_model/branch/branch';

import { ItemWarehouse } from '../../../../_model/item-warehouse/item-warehouse';
@Component({
  selector: 'app-inventory-level-report',
  templateUrl: './inventory-level-report.component.html',
  styleUrls: ['./inventory-level-report.component.scss'],
})
export class InventoryLevelReportComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  headerForm!: FormGroup;

  dataList: ItemWarehouse[] = [];
  userInfo: any;

  branches: any[] = [];
  branch?: Branch;

  isDisableBranch= false;

  constructor(private globalservice: GlobalService, 
    private fb: FormBuilder,
    private user: Users) {
    this.headerForm = this.fb.group({
      branchcode: '',
      branchname: '',
      fdate: '',
      tdate: ''
    });
  }

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();

    console.log(this.userInfo)
    if (this.userInfo.securityLevel === '1') {
      this.isDisableBranch = false
      this.headerForm.patchValue({
        branchcode: this.userInfo.branchCode,
        branchname: this.userInfo.branchName,
      });
    } else {
      this.isDisableBranch = true
      this.headerForm.patchValue({
        branchcode: this.userInfo.branchCode,
        branchname: this.userInfo.branchName,
      });
    }

    data = (await this.globalservice.getAuthList(
      'ItemWarehouse/GetInventoryLevel/' + this.userInfo.branchCode 
    )) as any;
    // if (this.userInfo.securityLevel === '1') {
    //   data = (await this.globalservice.getAuthList(
    //     'ItemWarehouse/GetInventoryLevel'
    //   )) as any;
    // } else {
    //   data = (await this.globalservice.getAuth(
    //     'ItemWarehouse/GetInventoryLevel',
    //     'GetData',
    //     this.userInfo
    //   )) as any;
    // }

    // data = (await this.globalservice.getAuthList('InventoryCount')) as any;
    console.log(data);
    if (data !== false) {
      for (var val of data) {
        this.dataList.push(val);
      }
    }
  }

  async Generate(): Promise<void>  {
    let data: any;
    this.dataList = [];

    data = (await this.globalservice.getAuthList(
      'ItemWarehouse/GetInventoryLevel/' + this.headerForm.value.branchcode + '/' +  this.headerForm.value.fdate + '/' + this.headerForm.value.tdate
    )) as any;

    console.log(data);
    if (data !== false) {
      for (var val of data) {
        this.dataList.push(val);
      }
    }
  }


  async BranchEvent(data: Branch): Promise<void> {
    this.branches.length = 0;
    this.userInfo = this.user.getCurrentUser();
    this.branch = data;
    this.headerForm.patchValue({
      branchcode: this.branch.ins_BranchCode,
      branchname: this.branch.ins_BranchName,
    });

    let ret: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();


    ret = (await this.globalservice.getAuthList(
      'ItemWarehouse/GetInventoryLevel/' + this.branch.ins_BranchCode
    )) as any;

    if (ret !== false) {
      for (var val of ret) {
        this.dataList.push(val);
      }
    }
  }
}
