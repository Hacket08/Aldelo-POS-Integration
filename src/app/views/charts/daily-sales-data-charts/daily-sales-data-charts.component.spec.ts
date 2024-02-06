import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySalesDataChartsComponent } from './daily-sales-data-charts.component';

describe('DailySalesDataChartsComponent', () => {
  let component: DailySalesDataChartsComponent;
  let fixture: ComponentFixture<DailySalesDataChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailySalesDataChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySalesDataChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
