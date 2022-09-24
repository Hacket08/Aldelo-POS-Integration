import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyOrderComponent } from './weekly-order.component';

describe('WeeklyOrderComponent', () => {
  let component: WeeklyOrderComponent;
  let fixture: ComponentFixture<WeeklyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
