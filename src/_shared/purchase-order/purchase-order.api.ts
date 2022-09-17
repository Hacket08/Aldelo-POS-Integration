import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { PurchaseOrder } from '../../_model/purchase-order/purchase-order';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderApi {
    constructor(
      public http: ApiHttpService,
      public swal: SwalService,
      public PurchaseOrder: PurchaseOrder
    ) {}
  
    public post_PurchaseOrder(data: PurchaseOrder, dataApi: string = "") {
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.post(this.http.getAPI('Purchaseorders') + "/" + dataApi, data, headers).subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No PurchaseOrder Added Transaction failed!.',
            'error'
          );
          return error;
        }
      );
    }
  
    public put_PurchaseOrder(data: PurchaseOrder, dataApi: string = "") {
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.put(this.http.getAPI('Purchaseorders') + "/" + dataApi, data, headers).subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Updated', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No PurchaseOrder Updated Transaction failed!.',
            'error'
          );
          return error;
        }
      );
    }
  
    public get_PurchaseOrder() {
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Purchaseorders')).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'No Data Found for PurchaseOrders',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
  
      return output;
    }
  
  
    public get_PurchaseOrderBy(apitype: string){
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Purchaseorders') + "/" + apitype, {responseType: 'text'}).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'No Data Found for PurchaseOrders',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
      return output;
    }


    public get_PurchaseOrder_details(objcode: string) {
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Purchaseorders') + "/" + objcode).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'Selected PurchaseOrder is not Available',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
  
      return output;
    }

  }