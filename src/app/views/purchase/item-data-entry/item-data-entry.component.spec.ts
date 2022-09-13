import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDataEntryComponent } from './item-data-entry.component';

describe('ItemDataEntryComponent', () => {
  let component: ItemDataEntryComponent;
  let fixture: ComponentFixture<ItemDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDataEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
