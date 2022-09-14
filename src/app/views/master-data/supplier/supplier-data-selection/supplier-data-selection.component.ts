import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupplierService } from '../../../../service/supplier/supplier-service';
import { Supplier } from '../../../../shared/supplier/supplier';

@Component({
  selector: 'app-supplier-data-selection',
  templateUrl: './supplier-data-selection.component.html',
  styleUrls: ['./supplier-data-selection.component.scss']
})
export class SupplierDataSelectionComponent implements OnInit {
  @Output() passedEvent= new EventEmitter();

  constructor(public supplierservice: SupplierService) { }

  supplier = new Supplier();
  suppliers: Supplier[] = [];

  ngOnInit(): void {
    for(let child of this.supplierservice.getList()){
      this.suppliers.push(child)
   }
  }

  eventReadData(e: any) {
    this.passedEvent.emit(e);
  }

  PassEvent(){
    this.passedEvent.emit();
  }

}
