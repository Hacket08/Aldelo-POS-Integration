import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountComponent } from './inventory-count.component';

describe('InventoryCountComponent', () => {
  let component: InventoryCountComponent;
  let fixture: ComponentFixture<InventoryCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
