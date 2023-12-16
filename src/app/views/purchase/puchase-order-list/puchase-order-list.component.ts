import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/_services/user.api';
import { TransactionList } from 'src/app_shared/models/transaction-list';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-puchase-order-list',
  templateUrl: './puchase-order-list.component.html',
  styleUrls: ['./puchase-order-list.component.scss'],
})
export class PuchaseOrderListComponent implements OnInit {
  documentType: string = 'PurchaseOrders';

  transactions: TransactionList[] = [];
  visibleTransaction: TransactionList[] = this.transactions;
  filterText: string = '';
  userInfo: any;
  inputType = 'text';
  datepipe: DatePipe = new DatePipe('en-US');

  
  filterCardCode: string = '';
  filterCardName: string = '';
  filterBranchName: string = '';
  filterDocStatus: string = '-1';
  filterCreatedBy: string = '';
  filterDocnum: string = '';
  filterPostingDate: string = '';
  filterDueDate: string = '';

  itemCount: number = 10;
  p: number = 1;

  constructor(private router: Router,
    private user: Users,
    private apiservice: GlobalApiService) { }

  ngOnInit(): void {

    this.view();
  }

  itemCountChange(value: any) {
    this.itemCount = value.target.value;
  }

  async view() {
    let response: any;

    this.userInfo = this.user.getCurrentUser();
    let userid = this.userInfo.userId;
    let emailAddress = this.userInfo.emailAddress;

    if (this.userInfo.securityLevel === '1') {
      response = await this.apiservice.getDataAsync(this.documentType, 'GetTransaction');
    } else {
      response = await this.apiservice.getDataAsync(this.documentType, 'GetTransaction', `${userid}\\${emailAddress}`);
    }

    this.transactions = [];
    for (var v of response) {

      switch (v.ins_DocStatus) {
        case 0: // Pending
          v.ins_Badge = 'warning';
          v.ins_BadgeName = 'PENDING';
          break;
        case 1: // Approved
          v.ins_Badge = 'success';
          v.ins_BadgeName = 'APPROVED';
          break;
        case 2: // Reject
          v.ins_Badge = 'danger';
          v.ins_BadgeName = 'REJECTED';
          break;
        case 3: // Cancel
          v.ins_Badge = 'danger';
          v.ins_BadgeName = 'CANCELLED';
          break;
        case -9: // Cancel
          v.ins_Badge = 'danger';
          v.ins_BadgeName = 'DELETED';
          break;
        case -8: // Cancel
          v.ins_Badge = 'danger';
          v.ins_BadgeName = 'CLOSED';
          break;
        default:
          break;
      }

      let newTransaction = new TransactionList(v.ins_Id, v.ins_DocNum, v.ins_DocStatus,
        v.ins_CardCode, v.ins_CardName, v.ins_PostingDate, v.ins_DocDate,
        v.ins_DueDate, v.ins_UserId, v.ins_DocTotal, v.ins_ModifiedBy, v.ins_CreatedBy,
        v.ins_BranchCode, v.ins_BranchName, v.ins_Badge, v.ins_BadgeName);

      this.transactions.push(newTransaction);

    }

    this.visibleTransaction = this.transactions;

  }

  filterTransactions() {
    let status = '';
   
    if (this.filterDocStatus === "-1") {
      status  = '';
    }
    else
    {
      status  = this.filterDocStatus;
    }

    this.visibleTransaction = this.transactions.filter(trans =>
      trans.ins_DocNum.toLowerCase().includes(this.filterDocnum.toLowerCase())
      && trans.ins_CardName.toLowerCase().includes(this.filterCardName.toLowerCase())
      && this.datepipe.transform(new Date(trans.ins_PostingDate), 'yyyy-MM-dd').includes(this.filterPostingDate.toLowerCase())
      && this.datepipe.transform(new Date(trans.ins_DueDate), 'yyyy-MM-dd').includes(this.filterDueDate.toLowerCase())
      && trans.ins_CreatedBy.toLowerCase().includes(this.filterCreatedBy.toLowerCase())
      && trans.ins_BranchName.toLowerCase().includes(this.filterBranchName.toLowerCase())
      && trans.ins_DocStatus.toString().includes(status)
    );

  }

  onInputFocus() {
    this.inputType = 'date';
  }

  onInputBlur() {
    this.inputType = 'text';
  }

  create() {
    this.router.navigate(['/purchase/purchase-order-transaction']);
  }

  edit(v: any) {
    this.router.navigate([`/purchase/purchase-order-transaction/${v.ins_Id}`]);
  }
} 
