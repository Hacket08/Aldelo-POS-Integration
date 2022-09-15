import { Component, OnInit } from '@angular/core';


import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  
  isListViewHidden = false;
  isTransactionViewHidden = false;

  constructor(public iconSet: IconSetService) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit(): void {
    this.isTransactionViewHidden = true;
    this.isListViewHidden = false;
    // console.log(this.isListViewHidden.toString() + this.isTransactionViewHidden.toString());
  }

  
  eventNewTransaction()
  {
    this.isListViewHidden = true;
    this.isTransactionViewHidden = false;
    // console.log("Event New Data Triggered");
  }

  eventListTransaction()
  {
    this.isListViewHidden = false;
    this.isTransactionViewHidden = true;
    // console.log("Event List Data Triggered");
  }

}
