import { Injectable } from '@angular/core';
import { ApiHttpService } from '../../_services/api-http.service';
import { SwalService } from '../../_services/swal-service';
import { ItemCategories } from '../../_model/item-categories/item-categories';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemCategoriesApi {
    constructor(
      public http: ApiHttpService,
      public swal: SwalService,
      public itemcategories: ItemCategories
    ) {}
  
    public post_item(data: ItemCategories) {
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.post(this.http.getAPI('ItemCategories'), data, headers).subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Posted', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Item Categories Added Transaction failed!.',
            'error'
          );
          return error;
        }
      );
    }
  
    public put_item(data: ItemCategories) {
      const headers = {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      };
      this.http.put(this.http.getAPI('ItemCategories'), data, headers).subscribe(
        (result) => {
          this.swal.commonSwalCentered('Data Succesfully Updated', 'success');
          return result;
        },
        (error) => {
          this.swal.commonSwalCentered(
            'No Item Categories Updated Transaction failed!.',
            'error'
          );
          return error;
        }
      );
    }
  
    public get_item() {
      const output = new Promise((resolve) => {
        this.http.get(this.http.getAPI('ItemCategories')).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'No Data Found for ItemCategories',
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
        this.http.get(this.http.getAPI('ItemCategories') + "/" + data).subscribe(
          (result) => {
            resolve(result);
          },
          (error: HttpErrorResponse) => {
            this.swal.commonSwalCentered(
              'Selected Item Categories is not Available',
              'error'
            );
            resolve(error.ok);
          }
        );
      });
  
      return output;
    }
    

    
  }