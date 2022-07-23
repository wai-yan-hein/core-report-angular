import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockReportComponent } from './stock/stock-report/stock-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MatInputModule } from '@angular/material/input';
import { UserComponent } from './user/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogComponent } from './dialog/dialog.component';

import {MatMenuModule} from '@angular/material/menu';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './features/login/login.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { RegionSetupComponent } from './features/region/region-setup/region-setup.component';
import { CompanyComponent } from './features/company/company/company.component';
import { CompanySetupComponent } from './features/company/company-setup/company-setup.component';
import { MatSelectModule } from '@angular/material/select';
import { RegionDialogComponent } from './features/region/region-dialog/region-dialog.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { UserCompanyAssignComponent } from './features/user-assign/user-company-assign/user-company-assign.component';
@NgModule({
  declarations: [
    AppComponent,
    StockReportComponent,
    UserComponent,
    DialogComponent,
    LoginComponent,
    LayoutsComponent,
    RegionSetupComponent,
    CompanyComponent,
    CompanySetupComponent,
    RegionDialogComponent,
    UserListComponent,
    UserCompanyAssignComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgGridModule,
    MatMenuModule,
  ],
  providers: [HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
