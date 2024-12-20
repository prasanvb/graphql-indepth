import { gql, GraphQLClient } from "graphql-request";
import { getAccessToken } from "../auth";

const endpoint = "http://localhost:9000/graphql";
const options = {
  headers: () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` };
    }
    return {};
  },
};
const client = new GraphQLClient(endpoint, options);

export const getJobs = async () => {
  const query = gql`
    query Jobs {
      fetchJobs {
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

  // NOTE: promise response contains resolver name and response returned by the resolver
  const res = await client.request(query);
  return res.fetchJobs;
};

export const getJobById = async (jobId) => {
  const query = gql`
    query jobById($jobId: ID!) {
      fetchJob(id: $jobId) {
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

  const res = await client.request(query, { jobId });
  return res.fetchJob;
};

export const getCompanyById = async (companyId) => {
  const query = gql`
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

  const res = await client.request(query, { companyId });
  return res.fetchCompany;
};

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation createNewJob($jobInput: CreateJobInput!) {
      createJob(jobInput: $jobInput) {
        id
        title
        description
      }
    }
  `;

  const res = await client.request(mutation, {
    jobInput: {
      title,
      description,
    },
  });
  return res;
};

export const deleteJobById = async (jobId) => {
  const mutation = gql`
    mutation deleteJon($jobId: ID!) {
      deleteJobById(id: $jobId) {
        id
        title
        description
      }
    }
  `;

  const res = await client.request(mutation, { jobId });
  return res.deleteJobById;
};

export const updateJobById = async ({ id, title, description }) => {
  const mutation = gql`
    mutation updateJob($input: UpdateJobInput!) {
      updateJobById(input: $input) {
        id
        title
        description
      }
    }
  `;

  const res = await client.request(mutation, {
    input: {
      id,
      title,
      description,
    },
  });
  return res;
};
