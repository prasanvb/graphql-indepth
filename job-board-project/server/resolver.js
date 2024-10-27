import { getJobs, getJob, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { toISOdate } from './utils/utils.js';

export const resolvers = {
  Query: {
    // NOTE: fetchJobs has 2 layer resolver functions 1.getJobs() and 2.Job
    // Data returned by getJobs() is used as input inside Job function
    fetchJobs: () => getJobs(),
    // NOTE: args is object with query parameter value
    fetchJob: (_root, args) => getJob(args.id),
    fetchCompany: (_root, args) => getCompany(args.id),
  },

  // Custom resolver for job
  Job: {
    // field value inside the custom resolver takes precedence over getJobs field values
    date: (getJobsResponse) => toISOdate(getJobsResponse.createdAt),
    company: (getJobsResponse) => getCompany(getJobsResponse.companyId),
  },
  Company: {
    jobs: (getCompany) => getJobsByCompany(getCompany.id),
  },
};
