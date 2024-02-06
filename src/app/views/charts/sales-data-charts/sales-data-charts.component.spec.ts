import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDataChartsComponent } from './sales-data-charts.component';

describe('SalesDataChartsComponent', () => {
  let component: SalesDataChartsComponent;
  let fixture: ComponentFixture<SalesDataChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesDataChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDataChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
