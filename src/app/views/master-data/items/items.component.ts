import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { ItemService } from '../../../../_shared/items/item.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  @Output() itemParentData: any[] = [];
  isListViewHidden = false;
  isTransactionViewHidden = false;

  constructor(public iconSet: IconSetService,
    public itemservice: ItemService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = true;
    this.isListViewHidden = false;
  }

  
  async eventNewTransaction(a: any)
  {

    this.itemParentData = [];

    if (a !== undefined) {
      const data = await this.itemservice.getDetails(a.ins_ItemCode);
        for (var val of data as any) {
          this.itemParentData.push(val as any);
        }
    }
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
    console.log("New View");
  }

  eventListTransaction()
  {
    this.itemParentData = [];
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
    console.log("List View");
  }
}
