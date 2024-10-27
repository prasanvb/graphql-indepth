import { gql, GraphQLClient } from "graphql-request";

const endpoint = "http://localhost:9000/graphql";

const client = new GraphQLClient(endpoint);

export const getJobs = async () => {
  const query = gql`
    query Jobs {
      jobs {
        id
        title
        description
        date
        company {
          id
          name
          description
        }
      }
    }
  `;

  const { jobs } = await client.request(query);
  return jobs;
};

export const getJobById = async (jobId) => {
  const query = gql`
    query jobById($jobId: ID!) {
      job(id: $jobId) {
        id
        title
        date
        description
        company {
          id
          name
        }
      }
    }
  `;

  const { job } = await client.request(query, { jobId });
  return job;
};

export const getCompanyById = async (companyId) => {
  const query = gql`
    query companyById($companyId: ID!) {
      company(id: $companyId) {
        id
        name
        description
      }
    }
  `;

  const { company } = await client.request(query, { companyId });
  return company;
};
