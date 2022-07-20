import { UserListComponent } from './user/user-list/user-list.component';
import { CompanySetupComponent } from './features/company/company-setup/company-setup.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { StockReportComponent } from './stock/stock-report/stock-report.component';
import { UserComponent } from './user/user/user.component';
import { AuthGuardService } from './core/services/authGuard/auth-guard.service';
import { RegionSetupComponent } from './features/region/region-setup/region-setup.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { CompanyComponent } from './features/company/company/company.component';
const routes: Routes = [
  {
    path: '', component: LayoutsComponent, canActivate: [AuthGuardService],children:[
      { path: 'stock', component: StockReportComponent,  },
      { path: 'user-setup', component: UserComponent, },
      { path: 'user', component: UserListComponent, },
      { path: 'region', component: RegionSetupComponent, },
      {path:'company',component:CompanyComponent},
      {path:'company-setup',component:CompanySetupComponent} 
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
