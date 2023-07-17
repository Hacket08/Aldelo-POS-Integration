import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { UserAccount } from 'src/_model/useraccount';


@Component({
  selector: 'app-users-selection',
  templateUrl: './users-selection.component.html',
  styleUrls: ['./users-selection.component.scss']
})
export class UsersSelectionComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter();
  useraccount: UserAccount[] = [];

  constructor(private globalservice: GlobalService) { }

  async ngOnInit(): Promise<void> {
    let data: any;
    this.useraccount = [];

    data = (await this.globalservice.getAuthList('UserAccount')) as any;
    if (data !== false) {
      for (var a of data) {
        this.useraccount.push(a);
      }
    }
  }

  selectEvent(e: any) {
    
    this.selectionEvent.emit(e);
  }
}
