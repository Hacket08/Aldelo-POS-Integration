import { Injectable } from '@angular/core';
import { Supplier } from '../../_model/supplier/supplier';
import { HttpClient } from '@angular/common/http';
import { SupplierApi } from '../../_shared/supplier/supplier.api'

@Injectable({ providedIn: 'root' })
export class SupplierService {
    constructor(public supplierapi: SupplierApi) {
    }

    async getList()
    {
      const sup = await this.supplierapi.get_supplier();
      return sup;
    }

    
    async getDetails(data: string)
    {
      const sup = await this.supplierapi.get_supplier_details(data);
      return sup;
    }
}
