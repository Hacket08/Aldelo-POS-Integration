import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../../_services/user.api';


import { InventoryWarehouse } from '../../../../../_model/inventory-warehouse/inventory-warehouse';

@Component({
  selector: 'app-inventory-count-list',
  templateUrl: './inventory-count-list.component.html',
  styleUrls: ['./inventory-count-list.component.scss']
})
export class InventoryCountListComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  dataList: InventoryWarehouse[] = [];
  userInfo: any;

  constructor(private globalservice: GlobalService, private user: Users) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();

    if (this.userInfo.securityLevel === '1') {
      data = (await this.globalservice.getAuthList('InventoryWarehouse')) as any;
    } else {
      data = (await this.globalservice.getAuth(
        'InventoryWarehouse',
        'GetData',
        this.userInfo
      )) as any;
    }

    // data = (await this.globalservice.getAuthList('InventoryWarehouse')) as any;
    // console.log(data);
    if (data !== false) {
      for (var val of data) {
        
           
        const sumBeg = val.ins_InventoryWarehouseLines.reduce((accumulator: any, currentValue: any) => {
          return accumulator + currentValue.ins_BegCount;
        }, 0);
        const sumEnd = val.ins_InventoryWarehouseLines.reduce((accumulator: any, currentValue: any) => {
          return accumulator + currentValue.ins_EndCount;
        }, 0);

        switch (val.ins_DocStatus) {
          case 0: // Pending
            val.ins_Badge = 'warning';
            val.ins_BadgeName = 'BEGGINING BALANCE ( FOR CONFIRMATION )';
            break;
          case 1: // Approved
            if (sumEnd > 0) {
              val.ins_Badge = 'primary';
              val.ins_BadgeName = 'ENDING BALANCE ( FOR CONFIRMATION )';
            } 
            else {
              val.ins_Badge = 'primary';
              val.ins_BadgeName = 'ENDING BALANCE ( PENDING )';
            }
            break;
          case 2: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'REJECTED';
            break;
          case 3: // Reject
              val.ins_Badge = 'danger';
              val.ins_BadgeName = 'CLOSE';
              break;
          default:
            break;
        }
        this.dataList.push(val);
      }
    }
  }

  PassEvent() {
    this.outputEvent.emit();
  }

  async DataLoadEvent(e: any) {
    await this.outputEvent.emit(await e);
  }
}
