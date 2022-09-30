import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMovementListComponent } from './inventory-movement-list.component';

describe('InventoryMovementListComponent', () => {
  let component: InventoryMovementListComponent;
  let fixture: ComponentFixture<InventoryMovementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryMovementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMovementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
