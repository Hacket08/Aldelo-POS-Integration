import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountingComponent } from './inventory-counting.component';

describe('InventoryCountingComponent', () => {
  let component: InventoryCountingComponent;
  let fixture: ComponentFixture<InventoryCountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCountingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
