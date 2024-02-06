import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsBranchDataMonitoringComponent } from './widgets-branch-data-monitoring.component';

describe('WidgetsBranchDataMonitoringComponent', () => {
  let component: WidgetsBranchDataMonitoringComponent;
  let fixture: ComponentFixture<WidgetsBranchDataMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsBranchDataMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsBranchDataMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
