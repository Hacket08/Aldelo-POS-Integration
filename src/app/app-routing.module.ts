import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';

import { AuthGuard } from '../_guard/auth.guard';
import { GlobalService } from 'src/_shared/api/service';



let redirect = JSON.parse(localStorage.getItem('userData')) !== null ? 'dashboard' : 'login'; 

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'sales',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/sales/sales.module').then((m) => m.SalesModule)
      },
      {
        path: 'purchase',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/purchase/purchase.module').then((m) => m.PurchaseModule)
      },
      {
        path: 'master-data',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/master-data/master-data.module').then((m) => m.MasterDataModule)
      },
      {
        path: 'inventory',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/inventory/inventory.module').then((m) => m.InventoryModule)
      },
      {
        path: 'others',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/others/others.module').then((m) => m.OthersModule)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/settings/settings.module').then((m) => m.SettingsModule)
      },
      {
        path: 'administration',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/administration/administration.module').then((m) => m.AdministrationModule)
      },


      
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
