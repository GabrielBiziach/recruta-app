// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { User } from '../models/user.model';

interface AuthResponse {
  token: string;
  role: string;
  idUser: number;
  username: string;
  name: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  role: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.apiUrl}/auth/login`;
  private registerUrl = `${environment.apiUrl}/auth/register`;

  private currentUser: { idUser: number, role: string, username: string, name: string } | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  private getAuthHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl, { username, password }).pipe(
      tap(response => {
        this.setSession(response);
        this.redirectUser(response.role);
      })
    );
  }

  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post<any>(this.registerUrl, registerData);
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
      role: authResponse.role,
      name: authResponse.name
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

  getUserById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/auth/user/${id}`);
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
