import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../../_services/user.api';
import { WeeklyOrder } from '../../../../../_model/weekly-order/weekly-order';

@Component({
  selector: 'app-weekly-order-list',
  templateUrl: './weekly-order-list.component.html',
  styleUrls: ['./weekly-order-list.component.scss']
})

export class WeeklyOrderListComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  dataList: WeeklyOrder[] = [];
  userInfo: any;
  
  constructor(private globalservice: GlobalService, private user: Users) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();
    console.log(this.userInfo);
    if (this.userInfo.securityLevel === '1') {
      data = (await this.globalservice.getAuthList('WeeklyOrder')) as any;
    } else {
      data = (await this.globalservice.getAuth(
        'WeeklyOrder',
        'GetData',
        this.userInfo
      )) as any;
    }






    // data = (await this.weeklyorderservice.getList()) as any;
    if (data !== false) {
      for (var val of data) {
        switch (val.ins_DocStatus) {
          case 0: // Pending
            val.ins_Badge = 'warning';
            val.ins_BadgeName = 'PENDING';
            break;
          case 1: // Approved
            val.ins_Badge = 'success';
            val.ins_BadgeName = 'FOR DELIVERY CONFIRMATION';
            break;
          case 2: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'REJECTED';
            break;
          case 3: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'CLOSED';
            break;
          case 4: // Reject
              val.ins_Badge = 'info';
              val.ins_BadgeName = 'FOR PO CREATION';
              if (val.ins_IsPOCreated) {
                val.ins_Badge = 'danger';
                val.ins_BadgeName = 'CLOSED';
              }
              break;
          case -1: // cancelled
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'CANCELLED';
            break;
          case -2: // deleted
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'DELETED';
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
