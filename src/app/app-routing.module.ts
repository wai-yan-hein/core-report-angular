
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { StockReportComponent } from './stock/stock-report/stock-report.component';
import { UserComponent } from './user/user/user.component';
import { AuthGuardService } from './core/services/authGuard/auth-guard.service';
import { LayoutsComponent } from './layouts/layouts.component';
const routes: Routes = [
  {
    path: '', component: LayoutsComponent, canActivate: [AuthGuardService],children:[
      { path: 'stock', component: StockReportComponent,  },
      { path: 'user', component: UserComponent, },
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
