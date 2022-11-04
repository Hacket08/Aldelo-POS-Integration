import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMonitoringComponent } from './inventory-monitoring.component';

describe('InventoryMonitoringComponent', () => {
  let component: InventoryMonitoringComponent;
  let fixture: ComponentFixture<InventoryMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
