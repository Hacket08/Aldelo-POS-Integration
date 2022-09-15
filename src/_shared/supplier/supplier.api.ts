import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { Supplier } from '../../_model/supplier/supplier';

@Injectable({ providedIn: 'root' })
export class SupplierApi {
  constructor(
    public http: ApiHttpService,
    public swal: SwalService,
    public supplier: Supplier
  ) {}

  public post_supplier(data: Supplier) {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.post(this.http.getAPI('Supplier'), data, headers).subscribe(
      (result) => {
        this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
        return result;
      },
      (error) => {
        this.swal.commonSwalCentered(
          'No Data Added Transaction failed!.',
          'error'
        );
        return error;
      }
    );
  }

  public put_supplier(data: Supplier) {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.put(this.http.getAPI('Supplier'), data, headers).subscribe(
      (result) => {
        this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
        return result;
      },
      (error) => {
        this.swal.commonSwalCentered(
          'No Data Added Transaction failed!.',
          'error'
        );
        return error;
      }
    );
  }

  public get_supplier() {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('Supplier')).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Data Added Transaction failed!.',
            'error'
          );
          resolve(error);
        }
      );
    });

    return output;
  }

  public get_supplier_details(data: string) {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('Supplier') + "/" + data).subscribe(
        (result) => {
          resolve(result);
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Data Added Transaction failed!.',
            'error'
          );
          resolve(error);
        }
      );
    });

    return output;
  }
  
}
