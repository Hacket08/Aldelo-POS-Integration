import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDataSelectionComponent } from './branch-data-selection.component';

describe('BranchDataSelectionComponent', () => {
  let component: BranchDataSelectionComponent;
  let fixture: ComponentFixture<BranchDataSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchDataSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDataSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
