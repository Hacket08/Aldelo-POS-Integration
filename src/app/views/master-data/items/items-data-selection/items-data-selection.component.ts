import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Item } from '../../../../../_model/item/item';
import { ItemSelection } from 'src/app_shared/models/item-selection';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service'

@Component({
  selector: 'app-items-data-selection',
  templateUrl: './items-data-selection.component.html',
  styleUrls: ['./items-data-selection.component.scss']
})
export class ItemsDataSelectionComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter();
  items!: ItemSelection[];

  // items: Item[] = [];

  constructor(private apiservice: GlobalApiService) { }

  async ngOnInit(): Promise<void> {
    let data: any;

    data = await this.apiservice.getData(
      'Item',
      'List'
    ).subscribe((data: any) => {
      this.items = data;
      console.log(this.items);
    });
  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }

}
