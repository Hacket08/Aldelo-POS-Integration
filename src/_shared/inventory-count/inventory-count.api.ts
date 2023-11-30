import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { InventoryCount } from '../../_model/inventory-count/inventory-count';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryCountApi {
  constructor(
    public http: ApiHttpService,
    public swal: SwalService,
    public inventorycount: InventoryCount
  ) {}

  public post_InventoryCount(data: InventoryCount, dataApi: string = '') {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .post(this.http.getAPI('InventoryCount') + '/' + dataApi, data, headers)
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

  public put_InventoryCount(data: InventoryCount, dataApi: string = '') {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('InventoryCount') + '/' + dataApi, data, headers)
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

  public get_InventoryCount() {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('InventoryCount')).subscribe(
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

  public get_InventoryCountByApi(apitype: string) {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('InventoryCount')+ '/' + apitype).subscribe(
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

  public get_InventoryCountBy(apitype: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI('InventoryCount') + '/' + apitype, {
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

  public get_InventoryCount_details(objcode: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI('InventoryCount') + '/' + objcode)
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

  public approve_InventoryCount(id: number) {
    
    console.log(id);
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('InventoryCount') + '/Approved/' + id , body)
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

  public reject_InventoryCount(id: number) {
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('InventoryCount') + '/Rejected/' + id , body)
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
