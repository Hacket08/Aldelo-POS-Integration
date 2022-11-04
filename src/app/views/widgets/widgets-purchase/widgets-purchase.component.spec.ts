import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsPurchaseComponent } from './widgets-purchase.component';

describe('WidgetsPurchaseComponent', () => {
  let component: WidgetsPurchaseComponent;
  let fixture: ComponentFixture<WidgetsPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
