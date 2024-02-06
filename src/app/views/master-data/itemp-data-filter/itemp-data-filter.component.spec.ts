import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItempDataFilterComponent } from './itemp-data-filter.component';

describe('ItempDataFilterComponent', () => {
  let component: ItempDataFilterComponent;
  let fixture: ComponentFixture<ItempDataFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItempDataFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItempDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
