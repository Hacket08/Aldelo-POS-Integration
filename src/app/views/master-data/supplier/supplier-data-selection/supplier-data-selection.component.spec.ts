import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDataSelectionComponent } from './supplier-data-selection.component';

describe('SupplierDataSelectionComponent', () => {
  let component: SupplierDataSelectionComponent;
  let fixture: ComponentFixture<SupplierDataSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDataSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDataSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
