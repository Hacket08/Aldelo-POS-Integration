import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PartnerSelection } from 'src/app_shared/models/partner-selection';
import { GlobalApiService } from 'src/app_shared/services/api/global-api.service'

@Component({
  selector: 'app-supplier-data-selection',
  templateUrl: './supplier-data-selection.component.html',
  styleUrls: ['./supplier-data-selection.component.scss']
})
export class SupplierDataSelectionComponent implements OnInit {
  @Output() selectionEvent = new EventEmitter();
  list: PartnerSelection[] = [];
  searchText: string = '';

  itemCount: number = 10;
  p: number = 1;
  visibleList: PartnerSelection[] = this.list;

  constructor(private apiservice: GlobalApiService) { }

  async ngOnInit(): Promise<void> {
    let data = await this.apiservice.getDataAsync('Supplier', 'List');
    this.list = data;
    this.visibleList = this.list;
  }

  selectEvent(e: any) {
    this.selectionEvent.emit(e);
  }

  filterItems(value: string) {
    this.visibleList = this.list.filter(list =>
      list.ins_CardName.toLowerCase().includes(value.toLowerCase())
    );
  }

  itemCountChange(value: any){
    this.itemCount = value.target.value;
  }
}
