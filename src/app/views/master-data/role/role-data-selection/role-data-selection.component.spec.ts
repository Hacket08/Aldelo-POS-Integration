import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDataSelectionComponent } from './role-data-selection.component';

describe('RoleDataSelectionComponent', () => {
  let component: RoleDataSelectionComponent;
  let fixture: ComponentFixture<RoleDataSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleDataSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDataSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
