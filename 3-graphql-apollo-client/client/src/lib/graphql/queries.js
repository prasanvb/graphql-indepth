import { gql } from "@apollo/client";

import { apolloClient } from "./client";

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

  // NOTE: Apollo client response `data` contains resolver name and response returned by the resolver
  try {
    const {
      data: { fetchJobs },
    } = await apolloClient.query({ query });

    return fetchJobs;
  } catch (e) {
    console.log("fetchJobs", e);
  }
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

  try {
    const {
      data: { fetchJob },
    } = await apolloClient.query({ query, variables: { jobId } });

    return fetchJob;
  } catch (e) {
    console.log("getJobById", e);
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
    });

    return createJob;
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
