import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDataEntryComponent } from './supplier-data-entry.component';

describe('SupplierDataEntryComponent', () => {
  let component: SupplierDataEntryComponent;
  let fixture: ComponentFixture<SupplierDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDataEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
