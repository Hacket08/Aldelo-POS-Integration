import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSalesMonitoringComponent } from './branch-sales-monitoring.component';

describe('BranchSalesMonitoringComponent', () => {
  let component: BranchSalesMonitoringComponent;
  let fixture: ComponentFixture<BranchSalesMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSalesMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSalesMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
