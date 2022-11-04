import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataEntryComponent } from './user-data-entry.component';

describe('UserDataEntryComponent', () => {
  let component: UserDataEntryComponent;
  let fixture: ComponentFixture<UserDataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
