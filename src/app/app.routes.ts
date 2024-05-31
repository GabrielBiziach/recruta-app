import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './admin/job/job.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: JobComponent, 
    data: { role: 'admin' },
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      { path: 'jobs', component: JobComponent },
      { path: 'applications', component: JobComponent },
    ]
  },
  { path: 'user', component: UserDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', redirectTo: '/user-dashboard', pathMatch: 'full' },
];
