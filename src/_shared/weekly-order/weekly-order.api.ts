import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { WeeklyOrder } from '../../_model/weekly-order/weekly-order';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeeklyOrderApi {
  constructor(
    public http: ApiHttpService,
    public swal: SwalService,
    public weeklyorder: WeeklyOrder
  ) {}

  public post_WeeklyOrder(data: WeeklyOrder, dataApi: string = '') {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .post(this.http.getAPI('WeeklyOrder') + '/' + dataApi, data, headers)
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

  public put_WeeklyOrder(data: WeeklyOrder, dataApi: string = '') {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('WeeklyOrder') + '/' + dataApi, data, headers)
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

  public get_WeeklyOrder() {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('WeeklyOrder')).subscribe(
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


  public get_WeeklyOrderByApi(apitype: string) {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI('WeeklyOrder')+ '/' + apitype).subscribe(
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


  public get_WeeklyOrderBy(apitype: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI('WeeklyOrder') + '/' + apitype, {
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

  public get_WeeklyOrder_details(objcode: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI('WeeklyOrder') + '/' + objcode)
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

  public approve_WeeklyOrder(id: number) {
    
    console.log(id);
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('WeeklyOrder') + '/Approved/' + id, body)
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

  public reject_WeeklyOrder(id: number) {
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI('WeeklyOrder') + '/Rejected/' + id, body)
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
