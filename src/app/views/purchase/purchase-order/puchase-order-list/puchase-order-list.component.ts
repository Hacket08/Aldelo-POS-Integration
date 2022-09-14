import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-puchase-order-list',
  templateUrl: './puchase-order-list.component.html',
  styleUrls: ['./puchase-order-list.component.scss']
})
export class PuchaseOrderListComponent implements OnInit {
  @Output() passedEvent= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  PassEvent(){
    this.passedEvent.emit();
  }
}
