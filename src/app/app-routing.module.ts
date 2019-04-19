import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookedjobsComponent }  from './bookedjobs/bookedjobs.component';
import { PaymentComponent } from './payment/payment.component';
import { BookedjobDetailComponent }  from './bookedjob-detail/bookedjob-detail.component';
import { AddjobComponent }  from './addjob/addjob.component';
import { TermsandconditionsComponent} from './termsandconditions/termsandconditions.component';
import { AddcardComponent } from './addcard/addcard.component';
import { AddbankaccountComponent } from './addbankaccount/addbankaccount.component';
import { SettingsComponent } from './settings/settings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AssignEmployeeComponent } from './assign-employee/assign-employee.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { StickerComponent } from './sticker/sticker.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addjob', component: AddjobComponent },
  { path: 'bookedjobs', component: BookedjobsComponent },
  { path: 'addjob', component: AddjobComponent },
  { path: 'addcard', component: AddcardComponent },
  { path: 'addbankaccount', component: AddbankaccountComponent},
  { path: 'payment', component: PaymentComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'termsandconditions', component: TermsandconditionsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'bookedjob-detail/:id', component: BookedjobDetailComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee-detail', component: EmployeeDetailComponent },
  { path: 'assign-employee/:id', component: AssignEmployeeComponent },
  { path: 'add-employee', component: AddemployeeComponent },
  { path: 'sticker', component: StickerComponent }
  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
