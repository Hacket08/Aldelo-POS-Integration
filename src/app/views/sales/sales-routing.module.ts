import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalesMonitoringComponent } from './sales-monitoring/sales-monitoring.component';
import { BranchSalesMonitoringComponent } from './branch-sales-monitoring/branch-sales-monitoring.component';
import { SalesReportComponent } from './sales-report/sales-report.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sales',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sales-monitoring',
      },
      {
        path: 'sales-monitoring',
        component: SalesMonitoringComponent,
        data: {
          title: 'Sales Monitoring',
        },
      },
      {
        path: 'branch-sales-monitoring',
        component: BranchSalesMonitoringComponent,
        data: {
          title: 'Branch Sales Monitoring',
        },
      },
      {
        path: 'sales-report',
        component: SalesReportComponent,
        data: {
          title: 'Sales Report',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}

