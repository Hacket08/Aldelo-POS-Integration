import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountTransactionComponent } from './inventory-count-transaction.component';

describe('InventoryCountTransactionComponent', () => {
  let component: InventoryCountTransactionComponent;
  let fixture: ComponentFixture<InventoryCountTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCountTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
