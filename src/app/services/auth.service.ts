// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

interface AuthResponse {
  token: string;
  role: string;
  idUser: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth/login`;
  private currentUser: { idUser: number, role: string, username: string } | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl, { username, password })
      .pipe(
        tap(response => {
          this.setSession(response);
          this.redirectUser(response.role);
        })
      );
  }

  logout() {
    this.clearSession();
    this.router.navigate(['/']);
  }

  private setSession(authResponse: AuthResponse) {
    sessionStorage.setItem('token', authResponse.token);
    sessionStorage.setItem('currentUser', JSON.stringify({
      idUser: authResponse.idUser,
      username: authResponse.username,
      role: authResponse.role
    }));
    this.currentUser = {
      idUser: authResponse.idUser,
      username: authResponse.username,
      role: authResponse.role
    };
  }

  private clearSession() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  getUserId(): number | null {
    return this.currentUser ? this.currentUser.idUser : null;
  }

  private redirectUser(role: string) {
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'user') {
      this.router.navigate(['/user']);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
