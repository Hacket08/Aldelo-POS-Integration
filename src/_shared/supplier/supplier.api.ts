import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { Supplier } from '../../_model/supplier/supplier';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SupplierApi {
  constructor(
    public http: ApiHttpService,
    public swal: SwalService,
    public supplier: Supplier
  ) {}

  public post_supplier(data: Supplier, dataApi: string = "") {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.post(this.http.getAPI('Supplier') + "/" + dataApi, data, headers).subscribe(
      (result) => {
        this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
        return result;
      },
      (error) => {
        this.swal.commonSwalCentered(
          'No Supplier Added Transaction failed!.',
          'error'
        );
        return error;
      }
    );
  }

  public put_supplier(data: Supplier, dataApi: string = "") {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.put(this.http.getAPI('Supplier') + "/" + dataApi, data, headers).subscribe(
      (result) => {
        this.swal.commonSwalCentered('Data Succesfully Updated', 'success');
        return result;
      },
      (error) => {
        this.swal.commonSwalCentered(
          'No Data Found in Supplier',
          'error'
        );
        return error;
      }
    );
  }

  public async get_supplier() {
    const output = await new Promise((resolve) => {
      this.http.get(this.http.getAPI('Supplier')).subscribe( 
        (result) => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(
            'No Data Found for Supplier',
            'error'
          );
          resolve(error.ok);
        }
      );
    });

    return output;
  }

  public get_supplier_details(dataApi: string) {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('Supplier') + "/" + dataApi).subscribe(
        (result) => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(
            'Selected Supplier is not Available',
            'error'
          );
          resolve(error.ok);
        }
      );
    });

    return output;
  }
  
}
