import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';

import { Invoice } from '../../../../../_model/invoice/invoice';

@Component({
  selector: 'app-invoice-selection',
  templateUrl: './invoice-selection.component.html',
  styleUrls: ['./invoice-selection.component.scss']
})
export class InvoiceSelectionComponent implements OnInit {

  @Output() selectionEvent = new EventEmitter();

  dataList: Invoice[] = [];

  constructor(private globalservice: GlobalService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];
    data = (await this.globalservice.getAuthList('Invoices/GetApprovedList')) as any;
    if (data !== false) {
      for (var a of data) {
        this.dataList.push(a);
      }
    }
  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }
}
