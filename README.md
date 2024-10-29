# GRAPHQL IN-DEPTH

## Apollo

- Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.
- [Apollo Server Example](basics/server/server.js)

## JWT Authentication

- [Authentication flow diagram](job-board-project/client/public/authentication.png)
- Bearer token is storied in the browser side local storage
- `express-jwt` module provides Express middleware for validating JWTs and the decoded JWT payload is available on the `request` object. The decoded JWT payload is available on the request via the `auth` property.
- Why there's a separate `/login` endpoint for authentication.
  - Protocol Independence: GraphQL can be used with various protocols (HTTP, WebSockets, etc.), and authentication should be handled at the protocol level to maintain flexibility.
  - Simplicity: Keeping authentication separate from GraphQL operations simplifies the API and avoids the need to include the token in every request.
  - Best Practices: Well-known GraphQL APIs like GitHub and Shopify follow this approach, demonstrating its effectiveness.
  - By separating authentication, the GraphQL API remains focused on data querying and mutation, while the underlying protocol handles the secure exchange of information.

## Graphql

- Approaches

  - Schema-First approach
  - Code first approach

- Graphql operation types

  - Query
  - Mutation
  - Fragment - Fragments allow you to define reusable parts of a query, making it easier to structure complex queries and avoid repetition.
  - Subscription
  - {}

- Graphql response object

  - Data
  - Error
  - Variables

- The GraphQL spec is itself transport-agnostic, however the convention adopted by the community has been to utilize POST requests but some libraries use GET requests.However, when doing so, the query has to be sent as a URL query parameter since GET requests can't have bodies. This can be problematic with bigger queries since you can easily hit a `414 URI Too Long` status on certain servers.

- [Graphql request using Fetch API](basics/client/index.html)

- `ID` scalar type represents a unique identifier key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

- Non nullable/required type representation in schema using exclamation `!` (example: `ID!`)

- `""" ISO date formate """` triple quotes in graphql schema are custom comments that will be added to graphql documentation

- [Graphql resolver](job-board-project/server/lib/resolver.js) can optionally accept four positional arguments

  - `root/parent` - The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain). For resolvers of top-level fields with no parent (such as fields of Query), this value is obtained from the rootValue function passed to Apollo Server's constructor.
  - `args` - Argument is an object that contains all inputs args that were provided for the field by the GraphQL operation
  - `contextValue` - An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers.
  - `info` - Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.

- GraphQL allows for recursive queries, enabling you to fetch data with arbitrary levels of nesting. This is particularly useful for hierarchical data, such as company-job relationships.

  ```graphql
  query nestedQueries {
    fetchCompany(id: "FjcJCHJALA4i") {
      id
      name
      jobs {
        id
        title
        company {
          id
          name
          jobs {
            id
            title
          }
        }
      }
    }
  }
  ```

- GraphQL supports efficient data fetching by allowing you to combine multiple queries into a single request. To avoid errors, it's crucial to make individual queries as nullable fields, if not whole response will throw an error.

  ```graphql
  query multiVarRequest {
    fetchCompany(id: "FjcJCHJALA4i") {
      id
      name
    }
    fetchJob(id: "6mA05AZxvS1R") {
      id
      title
    }
  }
  ```

- [Graphql error handling and custom errors](job-board-project/server/resolver.js)

- Graphql input types are used to define the structure of data that can be passed as arguments to fields, particularly in mutations.
