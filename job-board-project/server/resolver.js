import { getJobs } from './db/jobs.js';

export const resolvers = {
  Query: {
    greetings: () => 'Hello world!',
    job: () => getJobs(),
  },
};
