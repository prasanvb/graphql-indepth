import { gql } from "@apollo/client";

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

export const getJobByIdQuery = gql`
  query jobById($jobId: ID!) {
    fetchJob(id: $jobId) {
      ...JobDetail
    }
  }
  ${jobDetailsFragment}
`;
