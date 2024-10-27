# GRAPHQL IN-DEPTH

## Apollo

- Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.
- [Apollo Server Example](basics/server/server.js)

## Graphql

- Approaches

  - Schema-First approach
  - Code first approach

- Graphql operation types

  - Query
  - Mutation
  - Fragment
  - Subscription
  - {}

- Graphql response object

  - Data
  - Error
  - Variables

- The GraphQL spec is itself transport-agnostic, however the convention adopted by the community has been to utilize POST requests but some libraries use GET requests.However, when doing so, the query has to be sent as a URL query parameter since GET requests can't have bodies. This can be problematic with bigger queries since you can easily hit a `414 URI Too Long` status on certain servers.

- [Graphql request using Fetch API](basics/client/index.html)

- Non nullable/required type representation in schema using exclamation `!` (example: `ID!`)
