import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyOrderListComponent } from './weekly-order-list.component';

describe('WeeklyOrderListComponent', () => {
  let component: WeeklyOrderListComponent;
  let fixture: ComponentFixture<WeeklyOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
