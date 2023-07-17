import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLevelReportComponent } from './inventory-level-report.component';

describe('InventoryLevelReportComponent', () => {
  let component: InventoryLevelReportComponent;
  let fixture: ComponentFixture<InventoryLevelReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLevelReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLevelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
