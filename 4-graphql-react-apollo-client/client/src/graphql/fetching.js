import { gql } from "@apollo/client";
import { getJobById, jobDetailsFragment } from "./qureies";

import { apolloClient } from "./client";

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
          query: getJobById,
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
