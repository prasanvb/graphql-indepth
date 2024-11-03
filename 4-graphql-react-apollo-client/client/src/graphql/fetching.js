import { gql } from "@apollo/client";
import { getJobByIdQuery, jobDetailsFragment } from "./qureies";

import { apolloClient } from "./client";

export const getJobById = async (jobId) => {
  try {
    const {
      data: { fetchJob },
    } = await apolloClient.query({ query: getJobByIdQuery, variables: { jobId } });

    return fetchJob;
  } catch (e) {
    console.log("getJobById", e);
  }
};

export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation createNewJob($jobInput: CreateJobInput!) {
      createJob(jobInput: $jobInput) {
        ...JobDetail
      }
    }
    ${jobDetailsFragment}
  `;

  try {
    const {
      data: { createJob },
    } = await apolloClient.mutate({
      mutation,
      variables: {
        jobInput: {
          title,
          description,
        },
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: getJobByIdQuery,
          variables: { jobId: data.createJob.id },
          data: { fetchJob: data.createJob },
        });
      },
    });

    return createJob;
  } catch (e) {
    console.log("getCompanyById", e);
  }
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

  try {
    const {
      data: { fetchCompany },
    } = await apolloClient.query({ query, variables: { companyId } });

    return fetchCompany;
  } catch (e) {
    console.log("getCompanyById", e);
  }
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

  try {
    const {
      data: { deleteJobById },
    } = await apolloClient.mutate({
      mutation,
      variables: { jobId },
    });

    return deleteJobById;
  } catch (e) {
    console.log("deleteJobById", e);
  }
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

  try {
    const {
      data: { updateJobById },
    } = await apolloClient.mutate({
      mutation,
      variables: {
        input: {
          id,
          title,
          description,
        },
      },
    });

    return updateJobById;
  } catch (e) {
    console.log("updateJobById", e);
  }
};
