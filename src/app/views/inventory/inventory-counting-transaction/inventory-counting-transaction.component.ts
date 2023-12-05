import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { GlobalApiService } from 'src/app_shared/services/api/global-api.service'
import { ItemUomSelection } from "src/app_shared/models/item-uom-selection";
import { ItemTransaction } from "src/app_shared/models/item-transaction";

@Component({
  selector: 'app-inventory-counting-transaction',
  templateUrl: './inventory-counting-transaction.component.html',
  styleUrls: ['./inventory-counting-transaction.component.scss']
})
export class InventoryCountingTransactionComponent implements OnInit {
  headerForm!: FormGroup;
  itemUOM!: ItemUomSelection[];
  itemTransactions: ItemTransaction[];

  badge: string = 'secondary';
  badgename: string = 'New Transaction';
  documentnumber: string = "";

  // Actions
  spinnerHidden: boolean = true;
  printerHidden: boolean = true;
  saveHidden: boolean = true;
  confirmHidden: boolean = true;
  approvedHidden: boolean = true;
  rejectHidden: boolean = true;
  dividerHidden: boolean = true;
  cancelHidden: boolean = true;
  deleteHidden: boolean = true;
  backToListHidden: boolean = false;


  datepipe: DatePipe = new DatePipe('en-US');
  date: Date = new Date();
  postingdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  deliverydate = this.datepipe.transform(
    this.date.setDate(this.date.getDate() + 3),
    'yyyy-MM-dd'
  );

  constructor(private activeroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiservice: GlobalApiService
    ) {

    this.itemTransactions = [];
    this.headerForm = this.fb.group({
      inventorycountid: '',
      docstatus: 0,
    });
  }

  ngOnInit(): void {
    this.activeroute.params.subscribe(params => {
      this.documentnumber = params['documentnumber']; // Access the route parameter 'id'
    });

    if (this.documentnumber != undefined) {
      this.editTransaction(this.documentnumber);
    }
    else {
      this.addTransaction();
    }
  }

  addTransaction() {
  }

  editTransaction(documentnumber: string) { }

  submitTranaction() { }

  actionClick(actionid: number) {
    console.log(actionid);

    switch (actionid) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:
        break;
      case 9:
        break;
      case -1:
        this.BackToList();
        break;
      default:
        break;
    }
  }

  BackToList() {
    this.router.navigate(['/inventory/inventory-counting']);
  }
  
  ItemEvent(val: any) {
    console.log(val);
    this.apiservice.getData(
      'Item',
      'UomList',
      val.ins_ItemCode
    ).subscribe((data: any) => {
      this.itemTransactions.push(
        new ItemTransaction(val.ins_ItemCode, val.ins_ItemName, 1.00, data)
      )
    });

    console.log(this.itemTransactions);
  }

}
