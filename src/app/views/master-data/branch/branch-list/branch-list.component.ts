import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Branch } from '../../../../../_model/branch/branch';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit {
  @Output() outputEvent = new EventEmitter();
  dataList: Branch[] = [];

  constructor(private globalservice: GlobalService) { }

  async ngOnInit(): Promise<void> {
    let data: any;
    this.dataList = [];

    data = (await this.globalservice.getAuthList('Branch')) as any;
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
