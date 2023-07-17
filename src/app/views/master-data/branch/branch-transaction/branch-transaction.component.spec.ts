import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTransactionComponent } from './branch-transaction.component';

describe('BranchTransactionComponent', () => {
  let component: BranchTransactionComponent;
  let fixture: ComponentFixture<BranchTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
