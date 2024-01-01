import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Users } from 'src/_services/user.api';
import { Transaction } from 'src/app_shared/models/transaction';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service'

@Component({
  selector: 'app-purchase-order-selection',
  templateUrl: './purchase-order-selection.component.html',
  styleUrls: ['./purchase-order-selection.component.scss'],
})
export class PurchaseOrderSelectionComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter();

  documentType: string = 'PurchaseOrders';
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





  list: Transaction[] = [];
  searchText: string = '';

  itemCount: number = 10;
  p: number = 1;
  visibleList: Transaction[] = this.list;

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
    

    if (this.userInfo.securityLevel === '1') {
      data = await this.apiservice.getDataAsync(this.documentType, 'List');
    } else {
      data = await this.apiservice.getDataAsync(this.documentType, 'ListPerBranch', this.branchcode);
    }


    console.log("data", data);
    
    this.list = data;
    this.visibleList = this.list;
  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }

  filterItems(value: string) {
    this.visibleList = this.list.filter(list =>
      list.ins_DocNum.toLowerCase().includes(value.toLowerCase())
    );
  }

  itemCountChange(value: any){
    this.itemCount = value.target.value;
  }
}
