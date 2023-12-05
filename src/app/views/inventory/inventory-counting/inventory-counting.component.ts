import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-counting',
  templateUrl: './inventory-counting.component.html',
  styleUrls: ['./inventory-counting.component.scss']
})
export class InventoryCountingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    this.router.navigate(['/inventory/inventory-counting-transaction']);
  }
  edit() {
    this.router.navigate(['/inventory/inventory-counting-transaction']);
  }
}
