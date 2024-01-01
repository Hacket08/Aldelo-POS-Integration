import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Users } from 'src/_services/user.api';
import { BranchList } from 'src/app_shared/models/branch-list';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service'

@Component({
  selector: 'app-branch-data-selection',
  templateUrl: './branch-data-selection.component.html',
  styleUrls: ['./branch-data-selection.component.scss']
})
export class BranchDataSelectionComponent implements OnInit {
  @Output() selectionEvent= new EventEmitter();

  documentType: string = 'Branch';
  // Login Details
  userInfo: any;
  userApprover: any;
  createdby: string = '';
  modifiedby: string = '';
  approvedby: string = '';
  approveduserid: number;
  userid: number;
  approverlist: string = '';

  branchcode: string = '';
  branchname: string = '';


  list: BranchList[] = [];
  searchText: string = '';

  itemCount: number = 10;
  p: number = 1;
  visibleList: BranchList[] = this.list;

  constructor(private apiservice: GlobalApiService,
    private user: Users) { 



    this.userInfo = this.user.getCurrentUser();
    this.approverlist = this.user.getCurrentUserApprover();

    this.createdby = this.userInfo.fullName;
    this.modifiedby = this.userInfo.fullName;
    this.branchcode = this.userInfo.branchCode;
    this.branchname = this.userInfo.branchName;
    this.userid = this.userInfo.userId;

    this.approvedby = this.userInfo.fullName;
    this.approveduserid = this.userInfo.userId;


  }

  async ngOnInit(): Promise<void> {

    let data: any;
    data = await this.apiservice.getDataAsync(this.documentType, 'List');


    console.log("data", data);
    
    this.list = data;
    this.visibleList = this.list;
  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }

  filterItems(value: string) {
    this.visibleList = this.list.filter(list =>
      list.ins_BranchName.toLowerCase().includes(value.toLowerCase())
    );
  }

  itemCountChange(value: any){
    this.itemCount = value.target.value;
  }

}
