import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { EmployeeService } from './employee.service';
import { PaymentService } from './payment.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { BookedjobsComponent } from './bookedjobs/bookedjobs.component';
import { PaymentComponent } from './payment/payment.component';
import { JobService } from './job.service';
import { BookedjobDetailComponent } from './bookedjob-detail/bookedjob-detail.component';
import { AddjobComponent } from './addjob/addjob.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { MomentModule } from 'angular2-moment';
import { MomentTimezoneModule} from 'angular-moment-timezone';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { AddcardComponent } from './addcard/addcard.component';
import { AddbankaccountComponent } from './addbankaccount/addbankaccount.component';
import { SettingsComponent } from './settings/settings.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import "angular2-navigate-with-data";
import { MatDialogModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AddmarkerComponent } from './addmarker/addmarker.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AssignEmployeeComponent } from './assign-employee/assign-employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { StickerComponent } from './sticker/sticker.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BookedjobsComponent,
    PaymentComponent,
    BookedjobDetailComponent,
    AddjobComponent,
    TermsandconditionsComponent,
    AddcardComponent,
    AddbankaccountComponent,
    SettingsComponent,
    AddmarkerComponent,
    ForgotPasswordComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    AssignEmployeeComponent,
    AddemployeeComponent,
    StickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA3kCDJEt27BffFtNxO5me3JuKdB7fs6Kg",
      authDomain: "secuur-enterprise.firebaseapp.com",
      databaseURL: "https://secuur-enterprise.firebaseio.com",
      projectId: "secuur-enterprise",
      storageBucket: "secuur-enterprise.appspot.com",
      messagingSenderId: "269814118407"
    }),
    AngularFireDatabaseModule,
    AngularDateTimePickerModule,
    MomentModule,
    MomentTimezoneModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    Angular2FontawesomeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule,
    MatSortModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule
  ],
  providers: [EmployeeService,AuthenticationService, PaymentService, JobService],
  bootstrap: [AppComponent],
  entryComponents: [AddmarkerComponent]
})
export class AppModule { }
