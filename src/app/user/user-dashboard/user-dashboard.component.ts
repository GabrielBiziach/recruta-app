import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApplicationJobService } from '../../services/application-job.service';
import { JobService } from '../../services/job.service';
import { ApplicationJob } from '../../models/application-job.model';
import { Job } from '../../models/job.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})

export class UserDashboardComponent implements OnInit {
  jobs: Job[] = [];
  applications: ApplicationJob[] = [];
  searchKeyword: string = '';
  applicationForm: FormGroup;

  constructor(
    private jobService: JobService,
    private applicationJobService: ApplicationJobService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.applicationForm = this.fb.group({
      jobId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadApplications();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  loadApplications() {
    this.applicationJobService.getAllApplications().subscribe(applications => {
      this.applications = applications;
    });
  }

  applyToJob(jobId: number) {
    const userId = this.authService.getUserId();

    if (userId !== null) {
      const application: ApplicationJob = {
        jobId: jobId,
        userId: userId,
        applicationDate: new Date(),
        status: 'PENDENTE'
      };

      this.applicationJobService.applyToJob(application).subscribe(() => {
        this.loadApplications();
      });
    } else {
      console.error('User not logged in');
    }
  }
}
