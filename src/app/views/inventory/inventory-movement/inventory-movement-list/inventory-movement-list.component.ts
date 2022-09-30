import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';

import { InventoryMovement } from '../../../../../_model/inventory-movement/inventory-movement';

@Component({
  selector: 'app-inventory-movement-list',
  templateUrl: './inventory-movement-list.component.html',
  styleUrls: ['./inventory-movement-list.component.scss'],
})
export class InventoryMovementListComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  dataList: InventoryMovement[] = [];

  constructor(private globalservice: GlobalService) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];

    data = (await this.globalservice.getList('InventoryMovement')) as any;
    console.log(data);
    if (data !== false) {
      for (var val of data) {
        switch (val.ins_DocStatus) {
          case 0: // Pending
            val.ins_Badge = 'warning';
            val.ins_BadgeName = 'PENDING';
            break;
          case 1: // Approved
            val.ins_Badge = 'success';
            val.ins_BadgeName = 'APPROVED';
            break;
          case 2: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'REJECTED';
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
