import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTransactionComponent } from './module-transaction.component';

describe('ModuleTransactionComponent', () => {
  let component: ModuleTransactionComponent;
  let fixture: ComponentFixture<ModuleTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
