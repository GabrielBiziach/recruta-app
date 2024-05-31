import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { JobComponent } from './admin/job/job.component';
import { ApplicationJobComponent } from './admin/application-job/application-job.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      { path: 'jobs', component: JobComponent },
      { path: 'applications', component: ApplicationJobComponent },
    ]
  },
  { path: 'user', component: UserDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
