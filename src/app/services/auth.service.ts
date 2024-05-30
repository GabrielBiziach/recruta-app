import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/auth/login';
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl, { username, password })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          sessionStorage.setItem('role', response.role);
          this.redirectUser(response.role);
        })
      );
  }

  logout() {
    this.setToken(null);
    sessionStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  private setToken(token: string | null) {
    this.token = token;
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = sessionStorage.getItem('token');
    }
    return this.token;
  }

  getRole(): string | null {
    return sessionStorage.getItem('role');
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
