import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMovementTransactionComponent } from './inventory-movement-transaction.component';

describe('InventoryMovementTransactionComponent', () => {
  let component: InventoryMovementTransactionComponent;
  let fixture: ComponentFixture<InventoryMovementTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMovementTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMovementTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
