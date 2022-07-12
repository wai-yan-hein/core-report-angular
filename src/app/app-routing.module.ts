import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StockReportComponent } from './stock/stock-report/stock-report.component';
import { UserComponent } from './user/user/user.component';

const routes: Routes = [
  { path: 'stock', component: StockReportComponent },
  { path: 'user', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
