import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Users } from '../../../../../_services/user.api';
import { PurchaseOrder } from '../../../../../_model/purchase-order/purchase-order';

@Component({
  selector: 'app-puchase-order-list',
  templateUrl: './puchase-order-list.component.html',
  styleUrls: ['./puchase-order-list.component.scss'],
})
export class PuchaseOrderListComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  dataList: PurchaseOrder[] = [];
  userInfo: any;

  constructor(private globalservice: GlobalService, private user: Users) {}

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];
    this.userInfo = this.user.getCurrentUser();
    if (this.userInfo.securityLevel === '1') {
      data = (await this.globalservice.getAuthList('PurchaseOrders')) as any;
    } else {
      data = (await this.globalservice.getAuth(
        'PurchaseOrders',
        'GetData',
        this.userInfo
      )) as any;
    }

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
          case 3: // Reject
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'CLOSED';
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
