import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderMonitoringComponent } from './purchase-order-monitoring.component';

describe('PurchaseOrderMonitoringComponent', () => {
  let component: PurchaseOrderMonitoringComponent;
  let fixture: ComponentFixture<PurchaseOrderMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
