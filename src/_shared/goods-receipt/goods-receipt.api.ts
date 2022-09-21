import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { GoodsReceipt } from '../../_model/goods-receipt/goods-receipt';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoodsReceiptApi {
    constructor(
      public http: ApiHttpService,
      public swal: SwalService,
      public GoodsReceipt: GoodsReceipt
    ) {}
  
    public post_GoodsReceipt(data: GoodsReceipt, dataApi: string = "") {
      console.log("GRPO", data);
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.post(this.http.getAPI('Goodsreceipt') + "/" + dataApi, data, headers).subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No GoodsReceipt Added Transaction failed!.',
            'error'
          );
          return error;
        }
      );
    }
  
    public put_GoodsReceipt(data: GoodsReceipt, dataApi: string = "") {
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.put(this.http.getAPI('Goodsreceipt') + "/" + dataApi, data, headers).subscribe(
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
  
    public get_GoodsReceipt() {
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Goodsreceipt')).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'No Data Found for GoodsReceipts',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
  
      return output;
    }
  
  
    public get_GoodsReceiptBy(apitype: string){
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Goodsreceipt') + "/" + apitype, {responseType: 'text'}).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'No Data Found for Goodsreceipt',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
      return output;
    }


    public get_GoodsReceipt_details(objcode: string) {
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Goodsreceipt') + "/" + objcode).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'Selected GoodsReceipt is not Available',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
  
      return output;
    }

  }