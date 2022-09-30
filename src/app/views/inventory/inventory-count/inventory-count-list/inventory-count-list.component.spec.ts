import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCountListComponent } from './inventory-count-list.component';

describe('InventoryCountListComponent', () => {
  let component: InventoryCountListComponent;
  let fixture: ComponentFixture<InventoryCountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
