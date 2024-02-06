import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/_shared/api/service';
import { Item } from '../../../../_model/item/item';
import { ItemSelection } from 'src/app_shared/models/item-selection';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service'

@Component({
  selector: 'app-items-data-selection',
  templateUrl: './items-data-selection.component.html',
  styleUrls: ['./items-data-selection.component.scss']
})
export class ItemsDataSelectionComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter();
  items: ItemSelection[] = [];
  searchText: string = '';

  itemCount: number = 10;
  p: number = 1;
  visibleItems: ItemSelection[] = this.items;

  constructor(private apiservice: GlobalApiService) { }

  async ngOnInit(): Promise<void> {
    let data = await this.apiservice.getDataAsync('Item', 'List');
    this.items = data;

    console.log(this.items);
    
    this.visibleItems = this.items;
  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }

  filterItems(value: string) {
    this.visibleItems = this.items.filter(item =>
      item.ins_ItemName.toLowerCase().includes(value.toLowerCase())
    );
  }

  itemCountChange(value: any){
    this.itemCount = value.target.value;
  }
}
