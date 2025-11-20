import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UploadComponent } from './Upload/Upload.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Dashboard layout with child routes
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserComponent },
      {path: 'Uploadfile', component: UploadComponent }  // <-- add this
    ]
  },

  { path: '**', redirectTo: 'login' } 
];
