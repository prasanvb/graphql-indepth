import { gql } from "@apollo/client";

export const getJobs = gql`
  query Jobs {
    fetchJobs {
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
