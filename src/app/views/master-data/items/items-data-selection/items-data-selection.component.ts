import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Item } from '../../../../../_model/item/item';

@Component({
  selector: 'app-items-data-selection',
  templateUrl: './items-data-selection.component.html',
  styleUrls: ['./items-data-selection.component.scss']
})
export class ItemsDataSelectionComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter();
  items: Item[] = [];
  
  constructor(private globalservice: GlobalService) { }

  async ngOnInit(): Promise<void> {
    let data: any;
    this.items = [];

    data = (await this.globalservice.getAuthList('Item')) as any;
    // data = (await this.itemservice.getList())  as any;
    if (data !== false) {
      for (var val of data) {
        this.items.push(val);
      }
    }

  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }

  // eventReadData(e: any) {
  //   this.selectionEvent.emit(e);
  // }

  // PassEvent(){
  //   this.itemSelectionEvent.emit();
  // }

}
