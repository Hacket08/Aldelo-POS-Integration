import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../_model/purchase-order/purchase-order';
import { HttpClient } from '@angular/common/http';
import { GlobalApi } from '../api/api';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  constructor(private globalapi: GlobalApi) {}

  async postData(api: string, apiExtension: string = '', body: any) {
    const output =  await this.globalapi.post(api, apiExtension, body) as any;
    return output
  }

  async postAuth(api: string, apiExtension: string = '', body: any) {
    const output =  await this.globalapi.postAuth(api, apiExtension, body) as any;
    return output
  }


  async putData(api: string, apiExtension: string = '', body: any) {
    return await this.globalapi.put(api, apiExtension, body);
  }

  async putAuth(api: string, apiExtension: string = '', body: any) {
    return await this.globalapi.putAuth(api, apiExtension, body);
  }

  async getAuthList(api: string) {
    return await this.globalapi.getAuth(api);
  }

  async getAuthData(api: string, apiExtension: string) {
    return await new Promise((resolve) => {
      resolve(this.globalapi.getAuthData(api, apiExtension));
    });
  }

  async getMaxId(model: string) {
    return await this.globalapi.getAuthData(model, 'GetMaxId');
  }



  
  async docApproved(model: string, id: number) {
    return await this.globalapi.approved(model, id);
  }

  async docRejected(model: string, id: number) {
    return await this.globalapi.rejected(model, id);
  }

  async docClosed(model: string, id: number) {
    return await this.globalapi.closed(model, id);
  }

  async docDeleted(model: string) {}

}
