import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationJob } from '../models/application-job.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationJobService {
  private apiUrl = `${environment.apiUrl}/applicationJob`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  getAllApplications(): Observable<ApplicationJob[]> {
    return this.http.get<ApplicationJob[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  applyToJob(application: { user: { id: number }, job: { id: number } }): Observable<ApplicationJob> {
    return this.http.post<ApplicationJob>(this.apiUrl, application, { headers: this.getHeaders() });
  }
  
}
