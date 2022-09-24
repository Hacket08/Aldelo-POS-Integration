import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyOrderTransactionComponent } from './weekly-order-transaction.component';

describe('WeeklyOrderTransactionComponent', () => {
  let component: WeeklyOrderTransactionComponent;
  let fixture: ComponentFixture<WeeklyOrderTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyOrderTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyOrderTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
