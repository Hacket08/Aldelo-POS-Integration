import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsDashboardComponent } from './widgets-dashboard.component';

describe('WidgetsDashboardComponent', () => {
  let component: WidgetsDashboardComponent;
  let fixture: ComponentFixture<WidgetsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
