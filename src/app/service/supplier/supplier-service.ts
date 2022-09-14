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
      s.ins_SupplierCode = "something";
      s.ins_SupplierName = "something";
      list.push(s);
      
      s = new Supplier();
      s.ins_SupplierCode = "1";
      s.ins_SupplierName = "2";
      list.push(s);
  
      s = new Supplier();
      s.ins_SupplierCode = "1s";
      s.ins_SupplierName = "2s";
      list.push(s);
  
      return list;
    }
}
