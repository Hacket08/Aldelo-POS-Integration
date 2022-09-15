import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupplierService } from '../../../../../_shared/supplier/supplier.service';
import {
  Supplier,
  SupplierList,
} from '../../../../../_model/supplier/supplier';
import { Location } from '@angular/common';

@Component({
  selector: 'app-supplier-data-list',
  templateUrl: './supplier-data-list.component.html',
  styleUrls: ['./supplier-data-list.component.scss'],
})
export class SupplierDataListComponent implements OnInit {
  @Output() passedListEvent = new EventEmitter();
  suppliers: SupplierList[] = [];

  constructor(
    public suplierservice: SupplierService,
    private location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    let data: [];
    this.suppliers = [];

    data = (await this.suplierservice.getList()) as [];
    for (var val of data) {
      this.suppliers.push(val);
    }
  }

  PassEvent() {
    this.passedListEvent.emit();
  }

  async DataLoadEvent(e: any) {
    await this.passedListEvent.emit(await e);
  }

  pageRefresh() {
    location.reload();
  }
}
