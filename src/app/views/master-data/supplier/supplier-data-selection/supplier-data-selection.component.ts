import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { SupplierService } from '../../../../../_shared/supplier/supplier.service';
import { GlobalService } from 'src/_shared/api/service';
import { Supplier } from '../../../../../_model/supplier/supplier';

@Component({
  selector: 'app-supplier-data-selection',
  templateUrl: './supplier-data-selection.component.html',
  styleUrls: ['./supplier-data-selection.component.scss']
})
export class SupplierDataSelectionComponent implements OnInit {
  @Output() selectionEvent= new EventEmitter();

  constructor(private globalservice: GlobalService) { }

  supplier = new Supplier();
  suppliers: Supplier[] = [];

  async ngOnInit(): Promise<void> {
    let data: any;
    this.suppliers = [];

    data = (await this.globalservice.getAuthList('Supplier')) as any;
    // data = (await this.supplierservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {
        this.suppliers.push(val);
      }
    }
  }

  eventReadData(e: any) {
    this.selectionEvent.emit(e);
  }

  PassEvent(){
    this.selectionEvent.emit();
  }

}
