import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDataEntryComponent } from './items-data-entry.component';

describe('ItemsDataEntryComponent', () => {
  let component: ItemsDataEntryComponent;
  let fixture: ComponentFixture<ItemsDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsDataEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
