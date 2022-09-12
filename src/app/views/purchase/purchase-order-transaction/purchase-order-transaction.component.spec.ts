import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderTransactionComponent } from './purchase-order-transaction.component';

describe('PurchaseOrderTransactionComponent', () => {
  let component: PurchaseOrderTransactionComponent;
  let fixture: ComponentFixture<PurchaseOrderTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
