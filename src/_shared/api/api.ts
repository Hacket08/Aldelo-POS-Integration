import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GlobalApi {
  constructor(public http: ApiHttpService, public swal: SwalService) {}

  public post(
    model: string,
    dataApi: string = '',
    data: any,
  ) {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .post(
        this.http.getAPI(model) + '/' + dataApi,
        data,
        headers
      )
      .subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Data Added.',
            'error'
          );
          return error;
        }
      );
  }

  public put(
    model: string,
    dataApi: string = '',
    data: any,){

    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.put(this.http.getAPI(model) + "/" + dataApi, data, headers).subscribe(
      (result) => {
        this.swal.commonSwalCentered('Data Succesfully Updated', 'success');
        return result;
      },
      (error) => {
        this.swal.commonSwalCentered(
          'No GoodsReceipt Updated Transaction failed!.',
          'error'
        );
        return error;
      }
    );
  }

  public getlist(model: string) {
    const output = new Promise((resolve) => {
      this.http.get(this.http.getAPI(model)).subscribe(
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

  public getdata(
    model: string, apitype: string) {

      const output = new Promise((resolve) => {
        this.http
          .get(this.http.getAPI(model)+ '/' + apitype, {
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

  public approved(model: string, id: number){

    console.log(id);
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI(model) + '/Status/1/' + id , body)
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

  
  public rejected(model: string, id: number){
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI(model) + '/Status/2/' + id , body)
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

  
  public closed(model: string, id: number){
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http
      .put(this.http.getAPI(model) + '/Status/3/' + id , body)
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
