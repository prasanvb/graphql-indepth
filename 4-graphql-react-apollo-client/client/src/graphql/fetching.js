import { gql } from "@apollo/client";

import { apolloClient } from "./client";

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
