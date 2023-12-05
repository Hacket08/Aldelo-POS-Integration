import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountingTransactionComponent } from './inventory-counting-transaction.component';

describe('InventoryCountingTransactionComponent', () => {
  let component: InventoryCountingTransactionComponent;
  let fixture: ComponentFixture<InventoryCountingTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCountingTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
