import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { SupplierService } from '../../../../../_shared/supplier/supplier.service';
import { GlobalService } from 'src/_shared/api/service';
import { Branch } from '../../../../../_model/branch/branch';

@Component({
  selector: 'app-branch-data-selection',
  templateUrl: './branch-data-selection.component.html',
  styleUrls: ['./branch-data-selection.component.scss']
})
export class BranchDataSelectionComponent implements OnInit {
  @Output() selectionEvent= new EventEmitter();

  constructor(private globalservice: GlobalService) { }

  branch = new Branch();
  branches: Branch[] = [];

  async ngOnInit(): Promise<void> {
    let data: any;
    this.branches = [];

    data = (await this.globalservice.getAuthList('Branch')) as any;
    if (data !== false) {
      for (var val of data) {
        this.branches.push(val);
      }
    }
  }

  eventReadData(e: any) {
    console.log("Branch", e);
    this.selectionEvent.emit(e);
  }

  PassEvent(){
    this.selectionEvent.emit();
  }

}
