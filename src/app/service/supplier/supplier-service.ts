import { Injectable } from '@angular/core';
import { Supplier } from '../../shared/supplier/supplier';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SupplierService {
    constructor() {
    }

    getList()
    {
      let list: Supplier[] = [];
      let s = new Supplier();
      s.suppliercode = "something";
      s.suppliername = "something";
      list.push(s);
      
      s = new Supplier();
      s.suppliercode = "1";
      s.suppliername = "2";
      list.push(s);
  
      s = new Supplier();
      s.suppliercode = "1s";
      s.suppliername = "2s";
      list.push(s);
  
      return list;
    }
}
