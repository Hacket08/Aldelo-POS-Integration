import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';


import { InventoryWarehouse } from '../../../../../_model/inventory-warehouse/inventory-warehouse';

@Component({
  selector: 'app-inventory-count-list',
  templateUrl: './inventory-count-list.component.html',
  styleUrls: ['./inventory-count-list.component.scss']
})
export class InventoryCountListComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  dataList: InventoryWarehouse[] = [];

  constructor(private globalservice: GlobalService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];

    data = (await this.globalservice.getList('InventoryWarehouse')) as any;
    console.log(data);
    if (data !== false) {
      for (var val of data) {
        
        let InvType = '';

        switch (val.ins_DocStatus) {
          case 0: // Pending
          
            InvType = 'BEGGINING BALANCE';
            val.ins_Badge = 'warning';
            val.ins_BadgeName = InvType + ' ( FOR CONFIRMATION )';
            break;
          case 1: // Approved

            if(val.ins_InventoryType == 'B'){
              InvType = 'ENDING BALANCE';
              val.ins_Badge = 'primary';
              val.ins_BadgeName = InvType + ' ( PENDING )';
            } else {
              InvType = 'ENDING BALANCE';
              val.ins_Badge = 'primary';
              val.ins_BadgeName = InvType + ' ( FOR CONFIRMATION )';
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
