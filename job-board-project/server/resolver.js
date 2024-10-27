import { getJobs, getJob, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { toISOdate } from './utils/utils.js';
import { GraphQLError } from 'graphql';

const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
};

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
  Company: {
    jobs: (getCompany) => getJobsByCompany(getCompany.id),
  },
};
