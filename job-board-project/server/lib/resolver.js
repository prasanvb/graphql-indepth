import { getJobs, getJob, getJobsByCompany, createJob } from '../utils/jobs.js';
import { getCompany } from '../utils/companies.js';
import {
  toISOdate,
  notFoundError,
  internalServerError,
} from '../utils/utils.js';

export const resolvers = {
  Query: {
    // NOTE: fetchJobs has 2 layer resolver functions 1.getJobs() and 2.Job
    // Data returned by getJobs() is used as input inside Job function
    fetchJobs: () => getJobs(),
    // NOTE: args is object with query parameter value
    fetchJob: async (_root, args) => {
      const job = await getJob(args.id);

      if (!job) {
        throw notFoundError(`Job not found with id: ${args.id}`);
      }

      return job;
    },
    fetchCompany: async (_root, args) => {
      const company = await getCompany(args.id);

      if (!company) {
        throw notFoundError(`Company not found with id: ${args.id}`);
      }

      return company;
    },
  },

  // Custom resolver for job
  Job: {
    // field value inside the custom resolver takes precedence over getJobs field values
    date: (getJobsResponse) => toISOdate(getJobsResponse.createdAt),
    company: (getJobsResponse) => getCompany(getJobsResponse.companyId),
  },

  // Custom resolver for company
  Company: {
    jobs: (getCompany) => getJobsByCompany(getCompany.id),
  },

  // Mutation
  Mutation: {
    createJob: async (_root, args) => {
      const {
        jobInput: { title, description },
      } = args;
      const companyId = 'Gu7QW9LcnF5d';
      // NOTE: createJob function requires object as an input parameter
      const newJob = await createJob({ companyId, title, description });

      if (!newJob) {
        throw internalServerError('Unable to create new job, try again later');
      }

      return newJob;
    },
  },
};
