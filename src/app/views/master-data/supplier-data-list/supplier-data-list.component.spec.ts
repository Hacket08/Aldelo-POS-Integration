import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierDataListComponent } from './supplier-data-list.component';

describe('SupplierDataListComponent', () => {
  let component: SupplierDataListComponent;
  let fixture: ComponentFixture<SupplierDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
