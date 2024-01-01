import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTransactionComponent } from './role-transaction.component';

describe('RoleTransactionComponent', () => {
  let component: RoleTransactionComponent;
  let fixture: ComponentFixture<RoleTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
