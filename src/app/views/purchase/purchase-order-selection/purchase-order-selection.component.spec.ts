import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderSelectionComponent } from './purchase-order-selection.component';

describe('PurchaseOrderSelectionComponent', () => {
  let component: PurchaseOrderSelectionComponent;
  let fixture: ComponentFixture<PurchaseOrderSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
