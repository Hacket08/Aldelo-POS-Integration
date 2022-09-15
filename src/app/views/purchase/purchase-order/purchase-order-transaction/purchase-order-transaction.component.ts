import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemService } from '../../../../../_shared/item/item.service';
import { Item } from '../../../../../_model/item/item';
import { SupplierService } from '../../../../../_shared/supplier/supplier.service';
import { Supplier } from '../../../../../_model/supplier/supplier';

import { Users } from '../../../../../_services/user.api';

class POItem {
  itemcode: string = '';
  itemname: string = '';
}

@Component({
  selector: 'app-purchase-order-transaction',
  templateUrl: './purchase-order-transaction.component.html',
  styleUrls: ['./purchase-order-transaction.component.scss'],
})
export class PurchaseOrderTransactionComponent implements OnInit {
  @Input() childPost: any[] = [];
  @Output() passedEvent = new EventEmitter();
  datepipe: DatePipe = new DatePipe('en-US');
  postingdate = this.datepipe.transform(new Date(), 'MM/dd/YYYY');

  poitem: any[] = [];
  suppliers: any[] = [];

  supplier?: Supplier;

  suppliercode: string = '';
  suppliername: string = '';
  branchname: string = '';
  docstatus: string = 'Pending';

  constructor(public user: Users) {}

  ngOnInit(): void {

  }

  PassEvent() {
    this.passedEvent.emit();
  }

  eventAddRow(data: Item) {
    this.poitem.push(data);
  }

  eventSelectSupplier(data: Supplier) {
    this.suppliers.length = 0;
    const userInfo = this.user.getCurrentUser();

    this.supplier = data;
    this.suppliercode = this.supplier.ins_SupplierCode;
    this.suppliername = this.supplier.ins_SupplierName;
    this.branchname = userInfo[0].ins_BranchName;
  }

  numericOnly(event: any): boolean {
    let patt = /^[0-9]+(\.[0-9]{1,2})?$/;
    let result = patt.test(event.key);
    return result;
  }

  deleteItem(i: any) {
    this.poitem.splice(i, 1);
  }
}
