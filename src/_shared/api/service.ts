import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../_model/purchase-order/purchase-order';
import { HttpClient } from '@angular/common/http';
import { GlobalApi } from '../api/api';

@Injectable({ providedIn: 'root' })
export class GlobalService {
  constructor(private globalapi: GlobalApi) {}

  async postData(model: string, dataApi: string = '', data: any) {
    const output =  await this.globalapi.post(model, dataApi, data) as any;
    return output
  }

  async putData(model: string, dataApi: string = '', data: any) {
    return await this.globalapi.put(model, dataApi, data);
  }

  async getList(model: string) {
    return await this.globalapi.getlist(model);
  }

  async getMaxId(model: string) {
    return await this.globalapi.getdata(model, 'GetMaxId');
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
