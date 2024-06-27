import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from '../@vex/interfaces/vex-route.interface';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuard } from './services/auth-service/auth.guard';


const routes: VexRoutes = [
  {
    path: 'login',
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },

  {
    path: '',
    component: CustomLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/test-page/component/test-page.module').then(m => m.TestPageModule)
        // loadChildren: () => import('./pages/dashboards/component/dashboard-module').then(m => m.DashboardModule)
      },
      {
        path: 'test-page',
        loadChildren: () => import('./pages/test-page/component/test-page.module').then(m => m.TestPageModule)
      },
      {
        path: '**',
        loadChildren: () => import('./pages/errors/error-404/error-404.module').then(m => m.Error404Module)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected',
      anchorScrolling: 'enabled'
    })
  ],
  providers: [AuthGuard],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {

}
