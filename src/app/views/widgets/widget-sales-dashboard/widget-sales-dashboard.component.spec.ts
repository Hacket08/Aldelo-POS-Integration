import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonModule, DropdownModule, GridModule, WidgetModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { WidgetSalesDashboardComponent } from './widget-sales-dashboard.component';

describe('WidgetSalesDashboardComponent', () => {
  let component: WidgetSalesDashboardComponent;
  let fixture: ComponentFixture<WidgetSalesDashboardComponent>;
  let iconSetService: IconSetService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSalesDashboardComponent ],
      imports: [WidgetModule, DropdownModule, IconModule, ButtonModule, ChartjsModule, GridModule],
      providers: [IconSetService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(WidgetSalesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
