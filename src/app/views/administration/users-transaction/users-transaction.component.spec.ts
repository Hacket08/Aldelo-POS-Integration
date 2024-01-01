import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTransactionComponent } from './users-transaction.component';

describe('UsersTransactionComponent', () => {
  let component: UsersTransactionComponent;
  let fixture: ComponentFixture<UsersTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
