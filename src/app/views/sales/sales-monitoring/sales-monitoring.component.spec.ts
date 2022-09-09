import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMonitoringComponent } from './sales-monitoring.component';

describe('SalesMonitoringComponent', () => {
  let component: SalesMonitoringComponent;
  let fixture: ComponentFixture<SalesMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
