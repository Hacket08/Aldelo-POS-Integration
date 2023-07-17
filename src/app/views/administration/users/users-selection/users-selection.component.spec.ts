import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSelectionComponent } from './users-selection.component';

describe('UsersSelectionComponent', () => {
  let component: UsersSelectionComponent;
  let fixture: ComponentFixture<UsersSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
