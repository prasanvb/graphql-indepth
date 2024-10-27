import { getJobs, getJob } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { toISOdate } from './utils/utils.js';

export const resolvers = {
  Query: {
    // NOTE: job has 2 layer resolver functions 1.getJobs() and 2.Job
    // Data returned by getJobs() is used as input inside Job function
    jobs: () => getJobs(),
    // NOTE: args is object with query parameter value
    job: (_root, args) => getJob(args.id),
    company: (_root, args) => getCompany(args.id),
  },

  // Custom resolver for job
  Job: {
    // field value inside the custom resolver takes precedence over getJobs field values
    date: (job) => toISOdate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
  Company: {
    jobs: () => [],
  },
};
