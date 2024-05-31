import { Job } from "./job.model";
import { User } from "./user.model";

export interface ApplicationJob {
    id: number;
    userId: number;
    jobId: number;
    applicationDate: Date;
    status: string;
    feedback: string;
    editing?: boolean;
    job?: Job;
    user?: User;

  }
  