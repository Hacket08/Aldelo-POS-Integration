import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { InventoryWarehouse } from '../../_model/inventory-warehouse/inventory-warehouse';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryWarehouseApi {
  constructor(
    public http: ApiHttpService,
    public swal: SwalService,
    public inventorywarehouse: InventoryWarehouse
  ) {}

  public post_InventoryWarehouse(data: InventoryWarehouse, dataApi: string = '') {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .post(this.http.getAPI('InventoryWarehouse') + '/' + dataApi, data, headers)
      .subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Weekly Order Added Transaction failed!.',
            'error'
          );
          return error;
        }
      );
  }

  public put_InventoryWarehouse(data: InventoryWarehouse, dataApi: string = '') {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('InventoryWarehouse') + '/' + dataApi, data, headers)
      .subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Updated', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Weekly Order Updated Transaction failed!.',
            'error'
          );
          return error;
        }
      );
  }

  public get_InventoryWarehouse() {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('InventoryWarehouse')).subscribe(
        (result) => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(
            'No Data Found for Weekly Order',
            'error'
          );
          resolve(error.ok);
        }
      );
    });

    return output;
  }

  public get_InventoryWarehouseByApi(apitype: string) {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('InventoryWarehouse')+ '/' + apitype).subscribe(
        (result) => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(
            'No Data Found for Weekly Order',
            'error'
          );
          resolve(error.ok);
        }
      );
    });

    return output;
  }

  public get_InventoryWarehouseBy(apitype: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI('InventoryWarehouse') + '/' + apitype, {
          responseType: 'text',
        })
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'No Data Found for Weekly Order',
              'error'
            );
            resolve(error.ok);
          }
        );
    });
    return output;
  }

  public get_InventoryWarehouse_details(objcode: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI('InventoryWarehouse') + '/' + objcode)
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'Selected Weekly Order is not Available',
              'error'
            );
            resolve(error.ok);
          }
        );
    });

    return output;
  }

  public approve_InventoryWarehouse(id: number) {
    
    console.log(id);
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('InventoryWarehouse') + '/Approved/' + id , body)
      .subscribe(
        (result: any) => {
          if (result.Code == "200") {
            this.swal.commonSwalCentered(result.Message, 'success');
          }
          else
          {
            this.swal.commonSwalCentered(result.Message, 'error');
          }
          return result;
        },
        (error: HttpErrorResponse) => {
          console.log("error", error);
          this.swal.commonSwalCentered(
            'No Weekly Order Updated Transaction failed!.',
            'error'
          );
          return error;
        }
      );

  }

  public reject_InventoryWarehouse(id: number) {
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('InventoryWarehouse') + '/Rejected/' + id , body)
      .subscribe(
        (result: any) => {
          if (result.Code == "200") {
            this.swal.commonSwalCentered(result.Message, 'success');
          }
          else
          {
            this.swal.commonSwalCentered(result.Message, 'error');
          }
          return result;
        },
        (error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(
            'No Weekly Order Updated Transaction failed!.',
            'error'
          );
          return error;
        }
      );
  }

}
