import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GlobalApi {
  constructor(public http: ApiHttpService, public swal: SwalService) {}

  public post(api: string, apiExtension: string = '', body: any) {
    const headers = {
      Accept: 'text/plain',
      'Content-Type': 'application/json',
    };

    const output = new Promise((resolve) => {
      this.http
        .post(this.http.getAPI(api) + '/' + apiExtension, body, {
          headers,
          responseType: 'text',
        })
        .subscribe(
          async (result: any) => {
            var output = [];
            output = JSON.parse(result);
            console.log('output', output);
            if (output.errorCode == '200') {
              this.swal.commonSwalCentered(output.message, 'success');
            }

            if (output.errorCode == '401') {
              this.swal.commonSwalCentered(output.message, 'error');
            }
            resolve(output);
          },
          (error: HttpErrorResponse) => {
            var output = [];
            0;
            output = JSON.parse(error.error);
            // console.log("error", output);
            // console.log("error", output)

            this.swal.commonSwalCentered(output.message, 'error');
            resolve(output);
          }
        );
    });

    return output;
  }


  public put(model: string, dataApi: string = '', data: any) {
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };

    this.http
      .put(this.http.getAPI(model) + '/' + dataApi, data, headers)
      .subscribe(
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


  public postAuth2(api: string, apiExtension: string = '', body: any) {
    const user = JSON.parse(localStorage.getItem('userData'));

    const headers = {
      Accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.accessToken,
    };

    const output = new Promise((resolve) => {
      this.http
        .post(this.http.getAPI(api) + '/' + apiExtension, body, {
          headers,
          responseType: 'text',
        })
        .subscribe(
          async (result: any) => {
            var output = [];
            output = JSON.parse(result);
            if (output.Code == '200') {
              this.swal.commonSwalCentered(output.Message, 'success');
            }
            if (output.errorCode == '401') {
              this.swal.commonSwalCentered(output.Message, 'error');
            }
            resolve(output);
          },
          (error: HttpErrorResponse) => {
            var output = [];
            output = JSON.parse(error.error);

            this.swal.commonSwalCentered(output.message, 'error');
            resolve(output);
          }
        );
    });

    return output;
  }

  public postData(api: any = '', params: any) {
    const output = new Promise((resolve) => {
      this.http.post(api, params).subscribe(
        async (result: any) => {
          var output = [];
          output = JSON.parse(result);
          console.log('output', output);

          if (output.Code == '200') {
            this.swal.commonSwalCentered(output.Message, 'success');
          }

          if (output.errorCode == '401') {
            this.swal.commonSwalCentered(output.Message, 'error');
          }
          resolve(output);
        },
        (error: HttpErrorResponse) => {
          console.log('error', error);
          this.swal.commonSwalCentered(
            'No Weekly Order Updated Transaction failed!.',
            'error'
          );
          resolve(error);
        }
      );
    });
  }

  public putAuth2(api: string, apiExtension: string = '', body: any) {
    const user = JSON.parse(localStorage.getItem('userData'));

    const headers = {
      Accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.accessToken,
    };

    const output = new Promise((resolve) => {
      this.http
        .put(this.http.getAPI(api) + '/' + apiExtension, body, {
          headers,
          responseType: 'text',
        })
        .subscribe(
          async (result: any) => {
            var output = [];
            output = JSON.parse(result);
            if (output.Code == '200') {
              this.swal.commonSwalCentered(output.Message, 'success');
            }
            if (output.errorCode == '401') {
              this.swal.commonSwalCentered(output.Message, 'error');
            }
            resolve(output);
          },
          (error: HttpErrorResponse) => {
            var output = [];
            output = JSON.parse(error.error);

            this.swal.commonSwalCentered(output.message, 'error');
            resolve(output);
          }
        );
    });

    return output;
  }


  public postAuth(
    model: string,
    dataApi: string = '',
    data: any,){
    this.http.postAuth(this.http.getAPI(model) + "/" + dataApi, data).subscribe(
      (result) => {
        this.swal.commonSwalCentered('Data Succesfully Added', 'success');
        return result;
      },
      (error) => {
        this.swal.commonSwalCentered(
          error.message,
          'error'
        );
        return error;
      }
    );
  }


  public putAuth(
    model: string,
    dataApi: string = '',
    data: any,){

    this.http.putAuth(this.http.getAPI(model) + "/" + dataApi, data).subscribe(
      (result) => {
        this.swal.commonSwalCentered('Data Succesfully Updated', 'success');
        return result;
      },
      (error) => {
        this.swal.commonSwalCentered(
          error.message,
          'error'
        );
        return error;
      }
    );
  }

  public getAuth(api: string) {
    const output = new Promise((resolve) => {
      this.http.getAuth(this.http.getAPI(api)).subscribe(
        (result) => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(
            error.message,
            'error'
          );
          resolve(error.ok);
        }
      );
    });
    return output;
  }

  public getAuthData(model: string, apitype: string) {
    const output = new Promise((resolve) => {
      this.http.getAuth(this.http.getAPI(model) + '/' + apitype).subscribe(
        (result) => {
          resolve(result);
        },
        (error: HttpErrorResponse) => {
          this.swal.commonSwalCentered(
            error.message,
            'error'
          );
          resolve(error.ok);
        }
      );
    });
    return output;
  }

  public getdata(model: string, apitype: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI(model) + '/' + apitype, {
          responseType: 'text',
        })
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              error.message,
              'error'
            );
            resolve(error.ok);
          }
        );
    });
    return output;
  }

  public getdatawithparameter(model: string, apitype: string, param: string) {
    const output = new Promise((resolve) => {
      this.http
        .get(this.http.getAPI(model) + '/' + apitype + '?' + param, {
          responseType: 'text',
        })
        .subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              error.message,
              'error'
            );
            resolve(error.ok);
          }
        );
    });
    return output;
  }

  public approved(model: string, id: number) {
    console.log(id);
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.put(this.http.getAPI(model) + '/Status/1/' + id, body).subscribe(
      (result: any) => {
        if (result.Code == '200') {
          this.swal.commonSwalCentered(result.Message, 'success');
        }

        if (result.errorCode == '401') {
          this.swal.commonSwalCentered(result.Message, 'error');
        }
        return result;
      },
      (error: HttpErrorResponse) => {
        console.log('error', error);
        this.swal.commonSwalCentered(
          error.message,
          'error'
        );
        return error;
      }
    );
  }

  public rejected(model: string, id: number) {
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.put(this.http.getAPI(model) + '/Status/2/' + id, body).subscribe(
      (result: any) => {
        if (result.Code == '200') {
          this.swal.commonSwalCentered(result.Message, 'success');
        }
        if (result.Code == '401') {
          this.swal.commonSwalCentered(result.Message, 'error');
        }
        return result;
      },
      (error: HttpErrorResponse) => {
        this.swal.commonSwalCentered(
          error.message,
          'error'
        );
        return error;
      }
    );
  }

  public closed(model: string, id: number) {
    const body = { title: 'Angular PUT Request' };
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
    };
    this.http.put(this.http.getAPI(model) + '/Status/3/' + id, body).subscribe(
      (result: any) => {
        if (result.Code == '200') {
          this.swal.commonSwalCentered(result.Message, 'success');
        }
        if (result.Code == '401') {
          this.swal.commonSwalCentered(result.Message, 'error');
        }
        return result;
      },
      (error: HttpErrorResponse) => {
        this.swal.commonSwalCentered(
          error.message,
          'error'
        );
        return error;
      }
    );
  }
}
