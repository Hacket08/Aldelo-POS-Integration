import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTransactionComponent } from './invoice-transaction.component';

describe('InvoiceTransactionComponent', () => {
  let component: InvoiceTransactionComponent;
  let fixture: ComponentFixture<InvoiceTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
