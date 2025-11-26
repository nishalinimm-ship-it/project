import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UploadComponent } from './upload/upload.component';

// New components (you will create them)
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyUsersComponent } from './company/company-users/company-users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      /** HOME PAGE */
      { path: 'home', component: HomeComponent },

      /** ALL USER LIST */
      { path: 'users', component: UserComponent },

      /** COMPANY LIST */
      { path: 'company-list', component: CompanyListComponent },

      /** USERS OF A SELECTED COMPANY */
      { path: 'company-users/:id', component: CompanyUsersComponent },

       {path: 'Uploadfile', component: UploadComponent }  // <-- add this
    ]
  },

  { path: '**', redirectTo: 'login' }
];
