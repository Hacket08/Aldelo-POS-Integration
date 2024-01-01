import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptTransactionComponent } from './goods-receipt-transaction.component';

describe('GoodsReceiptTransactionComponent', () => {
  let component: GoodsReceiptTransactionComponent;
  let fixture: ComponentFixture<GoodsReceiptTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReceiptTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
