import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }, // Criaremos o AdminComponent em seguida
  { path: 'user', component: UserComponent },   // Criaremos o UserComponent em seguida
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
