import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from './models/job.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class JobComponent implements OnInit {
  jobs: Job[] = [];
  jobForm: FormGroup;
  editingJob: Job | null = null;

  constructor(private jobService: JobService, private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadJobs();
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
}
