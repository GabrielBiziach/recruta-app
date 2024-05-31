import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationJob } from '../../models/application-job.model';
import { ApplicationJobService } from '../../services/application-job.service';

@Component({
  selector: 'app-application-job',
  templateUrl: './application-job.component.html',
  styleUrls: ['./application-job.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ApplicationJobComponent implements OnInit {
  applications: ApplicationJob[] = [];

  constructor(private applicationJobService: ApplicationJobService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationJobService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data;
      },
      error: (err) => {
        console.error('Error loading applications:', err);
      }
    });
  }

  updateStatus(application: ApplicationJob, newStatus: string): void {
    if (application.id !== undefined) {
      application.status = newStatus;
      this.applicationJobService.updateApplication(application.id, { status: newStatus }).subscribe(() => {
        console.log('Status atualizado!');
      });
    } else {
      console.error('Aplicação não encontrada para atualizar.');
    }
  }

  addFeedback(application: ApplicationJob, feedback: string): void {
    if (application.id !== undefined) {
      application.feedback = feedback;
      this.applicationJobService.updateApplication(application.id, { feedback: feedback }).subscribe(() => {
        console.log('Feedback adicionado!');
      });
    } else {
      console.error('Aplicação não encontrada para atualizar.');
    }
  }
}
