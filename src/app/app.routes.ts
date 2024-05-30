import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './admin/job/job.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: JobComponent, data: { role: 'admin' } },
  { path: 'user', component: UserComponent },   // Criaremos o UserComponent em seguida
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
