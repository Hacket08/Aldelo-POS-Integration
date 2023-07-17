import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Supplier } from '../../../../../_model/supplier/supplier';

@Component({
  selector: 'app-supplier-data-list',
  templateUrl: './supplier-data-list.component.html',
  styleUrls: ['./supplier-data-list.component.scss'],
})
export class SupplierDataListComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  dataList: Supplier[] = [];

  constructor(private globalservice: GlobalService) { }

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];

    data = (await this.globalservice.getAuthList('Supplier')) as any;
    console.log(data);
    if (data !== false) {
      for (var val of data) {
        switch (val.ins_InActive) {
          case 0: // Pending
            val.ins_Badge = 'success';
            val.ins_BadgeName = 'ACTIVE';
            break;
          case 1: // Approved
            val.ins_Badge = 'danger';
            val.ins_BadgeName = 'IN ACTIVE';
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
