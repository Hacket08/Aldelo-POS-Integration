import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsSalesComponent } from './widgets-sales.component';

describe('WidgetsSalesComponent', () => {
  let component: WidgetsSalesComponent;
  let fixture: ComponentFixture<WidgetsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
