import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-supplier-data-list',
  templateUrl: './supplier-data-list.component.html',
  styleUrls: ['./supplier-data-list.component.scss']
})
export class SupplierDataListComponent implements OnInit {
  @Output() passedEvent= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  PassEvent(){
    this.passedEvent.emit();
  }
}
