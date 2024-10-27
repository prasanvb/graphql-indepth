import { getJobs } from './db/jobs.js';
import { toISOdate } from './utils/utils.js';

export const resolvers = {
  Query: {
    // NOTE: job has 2 layer resolver functions 1.getJobs() and 2.Job
    job: () => getJobs(),
  },

  // Custom resolver for job
  Job: {
    // field value inside the custom resolver takes precedence over getJobs field value
    date: (job) => toISOdate(job.createdAt),
  },
};
