import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { Item } from '../../_model/item/item';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemApi {
    constructor(
      public http: ApiHttpService,
      public swal: SwalService,
      public item: Item
    ) {}
  
    public post_item(data: Item) {
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.post(this.http.getAPI('Item'), data, headers).subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Item Added Transaction failed!.',
            'error'
          );
          return error;
        }
      );
    }
  
    public put_item(data: Item) {
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.put(this.http.getAPI('Item'), data, headers).subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Updated', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Item Updated Transaction failed!.',
            'error'
          );
          return error;
        }
      );
    }
  
    public get_item() {
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Item')).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'No Data Found for Items',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
  
      return output;
    }
  
    public get_item_details(data: string) {
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('Item') + "/" + data).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'Selected Item is not Available',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
  
      return output;
    }
    
  }