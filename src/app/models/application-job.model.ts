import { Job } from "./job.model";

export interface ApplicationJob {
    id?: number;
    userId: number;
    jobId: number;
    applicationDate: Date;
    status: string;
    feedback: string;
    job?: Job;
  }
  