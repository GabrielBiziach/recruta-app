import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { ApplicationJob } from '../../models/application-job.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationJobService } from '../../services/application-job.service';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];
  applications: ApplicationJob[] = [];
  jobForm: FormGroup;
  editingJob: Job | null = null;

  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private applicationJobService: ApplicationJobService
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadApplications();
  }
  
  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => {
        this.jobs = data;
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
      }
    });
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

  submitForm(): void {
    if (this.editingJob) {
      this.jobService.updateJob(this.editingJob.id, this.jobForm.value).subscribe(() => {
        this.loadJobs();
        this.resetForm();
      });
    } else {
      this.jobService.createJob(this.jobForm.value).subscribe(() => {
        this.loadJobs();
        this.resetForm();
      });
    }
  }

  editJob(job: Job): void {
    this.editingJob = job;
    this.jobForm.patchValue(job);
  }

  deleteJob(id: number): void {
    this.jobService.deleteJob(id).subscribe(() => {
      this.loadJobs();
    });
  }

  resetForm(): void {
    this.jobForm.reset();
    this.editingJob = null;
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
