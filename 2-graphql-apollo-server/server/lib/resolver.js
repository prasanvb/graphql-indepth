import {
  getJobs,
  getJob,
  getJobsByCompany,
  createJob,
  deleteJob,
  updateJob,
} from '../utils/jobs.js';
import { getUser } from '../utils/users.js';
import { getCompany } from '../utils/companies.js';
import {
  toISOdate,
  notFoundError,
  internalServerError,
  unauthorizedError,
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
    // NOTE: Without DataLoader
    // company: (getJobsResponse) => getCompany(getJobsResponse.companyId),
    // NOTE: With DataLoader: global companyLoader cache
    // company: (getJobsResponse) => companyLoader.load(getJobsResponse.companyId),
    // NOTE: With DataLoader: new companyLoader instance created per request and its per request cache
    company: (getJobsResponse, _args, context) => {
      // IMPORTANT: console.log({ context });
      return context.companyLoader.load(getJobsResponse.companyId);
    },
  },

  // Custom resolver for company
  Company: {
    jobs: (getCompany) => getJobsByCompany(getCompany.id),
  },

  // Mutation
  Mutation: {
    createJob: async (_root, args, context) => {
      const {
        jobInput: { title, description },
      } = args;
      const { auth } = context;

      if (!auth) {
        throw unauthorizedError('User not authorized');
      }

      const user = auth && (await getUser(auth?.sub));
      const companyId = user && user?.companyId;

      // NOTE: createJob function requires object as an input parameter
      const newJob = await createJob({ companyId, title, description });

      if (!newJob) {
        throw internalServerError('Unable to create new job, try again later');
      }

      return newJob;
    },
    deleteJobById: async (_root, args, context) => {
      const jobId = args.id;
      const { auth } = context;

      if (!auth) {
        throw unauthorizedError('User not authorized');
      }

      const user = await getUser(auth.sub);
      const companyId = user.companyId;
      const job = await deleteJob(jobId, companyId);

      if (!job) {
        throw notFoundError(`Job not found with id: ${jobId}`);
      }

      return job;
    },
    updateJobById: async (_root, args, context) => {
      const { auth } = context;

      if (!auth) {
        throw unauthorizedError('User not authorized');
      }

      const {
        input: { id, title, description },
      } = args;
      const user = await getUser(auth.sub);
      const companyId = user.companyId;

      const updatedJob = await updateJob({ id, title, description, companyId });

      if (!updatedJob) {
        throw internalServerError('Unable to create new job, try again later');
      }

      return updatedJob;
    },
  },
};
