import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupplierService } from '../../../../../_shared/supplier/supplier.service';
import { Supplier } from '../../../../../_model/supplier/supplier';

@Component({
  selector: 'app-supplier-data-selection',
  templateUrl: './supplier-data-selection.component.html',
  styleUrls: ['./supplier-data-selection.component.scss']
})
export class SupplierDataSelectionComponent implements OnInit {
  @Output() supplierSelectionEvent= new EventEmitter();

  constructor(public supplierservice: SupplierService) { }

  supplier = new Supplier();
  suppliers: Supplier[] = [];

  async ngOnInit(): Promise<void> {
    let data: any;
    this.suppliers = [];

    data = (await this.supplierservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {
        this.suppliers.push(val);
      }
    }
  }

  eventReadData(e: any) {
    this.supplierSelectionEvent.emit(e);
  }

  PassEvent(){
    this.supplierSelectionEvent.emit();
  }

}
