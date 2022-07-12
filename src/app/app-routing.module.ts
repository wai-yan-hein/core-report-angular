import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { StockReportComponent } from './stock/stock-report/stock-report.component';
import { UserComponent } from './user/user/user.component';
import { AuthGuardService } from './core/services/authGuard/auth-guard.service';
const routes: Routes = [
  { path: 'stock', component: StockReportComponent,canActivate:[AuthGuardService] },
  { path: 'user', component: UserComponent,canActivate:[AuthGuardService]  },
  {path:'login',component:LoginComponent},
  { path: '**', redirectTo: 'stock' },
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
