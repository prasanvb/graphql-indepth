import { gql } from "@apollo/client";

export const getJobs = gql`
  query Jobs($limit: Int, $offset: Int) {
    fetchJobs(limit: $limit, offset: $offset) {
      id
      title
      date
      company {
        id
        name
      }
    }
  }
`;

export const jobDetailsFragment = gql`
  fragment JobDetail on Job {
    id
    title
    date
    description
    company {
      id
      name
    }
  }
`;

export const getJobById = gql`
  query jobById($jobId: ID!) {
    fetchJob(id: $jobId) {
      ...JobDetail
    }
  }
  ${jobDetailsFragment}
`;

export const getCompanyById = gql`
  query companyById($companyId: ID!) {
    fetchCompany(id: $companyId) {
      id
      name
      description
      jobs {
        id
        date
        title
      }
    }
  }
`;

export const createJob = gql`
  mutation createNewJob($jobInput: CreateJobInput!) {
    createJob(jobInput: $jobInput) {
      ...JobDetail
    }
  }
  ${jobDetailsFragment}
`;

export const deleteJobId = gql`
  mutation deleteJon($jobId: ID!) {
    deleteJobById(id: $jobId) {
      id
      title
      description
    }
  }
`;

export const updateJobById = gql`
  mutation updateJob($input: UpdateJobInput!) {
    updateJobById(input: $input) {
      id
      title
      description
    }
  }
`;
