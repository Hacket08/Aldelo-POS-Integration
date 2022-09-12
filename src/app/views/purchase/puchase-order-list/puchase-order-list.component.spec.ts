import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuchaseOrderListComponent } from './puchase-order-list.component';

describe('PuchaseOrderListComponent', () => {
  let component: PuchaseOrderListComponent;
  let fixture: ComponentFixture<PuchaseOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuchaseOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuchaseOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
