import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../_services/user.api';

import { ItemWarehouse } from '../../../../_model/item-warehouse/item-warehouse';
@Component({
  selector: 'app-inventory-level-report',
  templateUrl: './inventory-level-report.component.html',
  styleUrls: ['./inventory-level-report.component.scss']
})
export class InventoryLevelReportComponent implements OnInit {
  dataList: ItemWarehouse[] = [];
  userInfo: any;

  constructor(private globalservice: GlobalService, private user: Users) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();

    if (this.userInfo.securityLevel === '1') {
      data = (await this.globalservice.getAuthList('ItemWarehouse/GetInventoryLevel')) as any;
    } else {
      data = (await this.globalservice.getAuth(
        'ItemWarehouse/GetInventoryLevel',
        'GetData',
        this.userInfo
      )) as any;
    }

    // data = (await this.globalservice.getAuthList('InventoryWarehouse')) as any;
    // console.log(data);
    if (data !== false) {
      for (var val of data) {
        this.dataList.push(val);
      }
    }
  }
}
