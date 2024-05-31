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
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  getAllApplications(): Observable<ApplicationJob[]> {
    return this.http.get<ApplicationJob[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  applyToJob(application: { user: { id: number }, job: { id: number } }): Observable<ApplicationJob> {
    return this.http.post<ApplicationJob>(this.apiUrl, application, { headers: this.getHeaders() });
  }

  updateApplication(applicationId: number, updatedData: Partial<ApplicationJob>): Observable<ApplicationJob> {
    const url = `${this.apiUrl}/${applicationId}`;
    return this.http.put<ApplicationJob>(url, updatedData, { headers: this.getHeaders() });
  }
  
}
