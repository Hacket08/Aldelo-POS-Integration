import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDataSelectionComponent } from './items-data-selection.component';

describe('ItemsDataSelectionComponent', () => {
  let component: ItemsDataSelectionComponent;
  let fixture: ComponentFixture<ItemsDataSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsDataSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDataSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
