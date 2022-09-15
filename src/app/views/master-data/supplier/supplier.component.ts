import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { SupplierService } from '../../../../_shared/supplier/supplier.service';

import {
  Supplier,
  SupplierList,
} from '../../../../_model/supplier/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  @Output() supplierParentData: any[] = [];

  supplierData: any[] = [];
  isListViewHidden = false;
  isTransactionViewHidden = false;

  constructor(public iconSet: IconSetService,
    public suplierservice: SupplierService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = true;
    this.isListViewHidden = false;
  }

  async eventNewTransaction(a: any)
  {
    this.supplierParentData = [];

    if (a !== undefined) {
      const data = await this.suplierservice.getDetails(a.ins_SupplierCode);
        for (var val of data as any) {
          this.supplierParentData.push(val as any);
        }
    }
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
  }

  eventListTransaction()
  {
    this.supplierParentData = [];
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
  }
}
