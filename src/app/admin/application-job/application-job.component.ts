import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ApplicationJob } from '../../models/application-job.model';
import { ApplicationJobService } from '../../services/application-job.service';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-application-job',
  templateUrl: './application-job.component.html',
  styleUrls: ['./application-job.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ApplicationJobComponent implements OnInit {
  applications: ApplicationJob[] = [];
  

  constructor(
    private applicationJobService: ApplicationJobService,  
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationJobService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data.map(app => ({
          ...app,
          editing: false
        }));
        
        this.applications.forEach(app => {
          console.log(app);
          this.authService.getUserById(app.userId).subscribe({
            next: (user) => {
              if (user) {
                app.user = user;
              } else {
                app.user = { username: 'Nome do usuário não encontrado', role: '', name: '', email: '' };
              }
            },
            error: (err) => {
              console.error('Error loading user:', err);
              app.user = { username: 'Nome do usuário não encontrado', role: '', name: '', email: '' };
            }
          });
        });
      },
      error: (err) => {
        console.error('Error loading applications:', err);
      }
    });
  }

  toggleEdit(application: ApplicationJob): void {
    application.editing = !application.editing;
    if (!application.editing) {
      this.saveChanges(application);
    }
  }

  saveChanges(application: ApplicationJob): void {
        
    const userId = this.authService.getUserId();
    const jobId = application.job?.id;

    if (userId === null) {
      console.error('ID do usuário não encontrado.');
      return;
    } else if(jobId == undefined) {
      console.error('ID da vaga não encontrada.');
      return;
    }

    const updatedData = {
      user: { id: userId },
      job: { id: jobId },
      applicationDate: application.applicationDate,
      status: application.status,
      feedback: application.feedback
    };

    this.applicationJobService.updateApplication(application.id, updatedData).subscribe(() => {
      console.log('Alterações salvas com sucesso!');
    }, error => {
      console.error('Erro ao salvar alterações:', error);
    });

  }

}
