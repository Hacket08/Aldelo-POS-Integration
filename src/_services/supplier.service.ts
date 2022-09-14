import { Injectable } from '@angular/core'; 
import { ApiHttpService } from '../_services/api-http.service';
import { SwalService } from './swal-service';
import { Supplier } from '../app/shared/supplier/supplier';

@Injectable({ providedIn: 'root' })

export class SupplierServices{
    constructor(public http: ApiHttpService, public swal: SwalService) {
    }

    public supplier_post() {
        return this.http.getAPI('Supplier');
    }
}