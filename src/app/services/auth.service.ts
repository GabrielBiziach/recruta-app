import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl, { username, password })
      .pipe(
        tap(response => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
          this.redirectUser(response.role);
        })
      );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
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
}
