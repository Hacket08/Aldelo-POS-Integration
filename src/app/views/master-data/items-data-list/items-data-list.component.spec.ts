import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDataListComponent } from './items-data-list.component';

describe('ItemsDataListComponent', () => {
  let component: ItemsDataListComponent;
  let fixture: ComponentFixture<ItemsDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
