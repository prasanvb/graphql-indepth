# GRAPHQL IN-DEPTH

- Express apollo server using Schema-First approach

## Projects

### 1-Graphql-basics

- [Apollo Server SDL approach Example](1-graphql-basics/server/server.js)
- [Apollo Server code first approach Example](1-graphql-basics/server/server-code-first.js)
- [Graphql request using Fetch API](1-graphql-basics/client/app.js)

### 2-Express-Graphql-Apollo-Server

- Express backend app using Apollo Server Express middleware
- JWT Authentication using `express-jwt` middleware
- `graphql-request` minimal GraphQL client supporting Node and browsers for scripts or simple apps

### 3-Graphql-Apollo-Client

- Graphql Apollo Client implementation
- Graphql Apollo Client - Apollo link for authentication
- Graphql Apollo Client caching and fetching policies

### 4-Graphql-React-Apollo-Client

- Graphql React Apollo Client using `useQuery` and `useMutation` hooks
- Graphql server side batching and caching using `DataLoader`
- Graphql pagination - client and server implementation

## JWT Authentication

- [Authentication flow diagram](2-graphql-apollo-server/client/public/authentication.png)
- Bearer token is storied in the browser side local storage
- `express-jwt` module provides Express middleware for validating JWTs and the decoded JWT payload is available on the `request` object. The decoded JWT payload is available on the request via the `auth` property.
- Why there's a separate `/login` endpoint for authentication.
  - Protocol Independence: GraphQL can be used with various protocols (HTTP, WebSockets, etc.), and authentication should be handled at the protocol level to maintain flexibility.
  - Simplicity: Keeping authentication separate from GraphQL operations simplifies the API and avoids the need to include the token in every request.
  - Best Practices: Well-known GraphQL APIs like GitHub and Shopify follow this approach, demonstrating its effectiveness.
  - By separating authentication, the GraphQL API remains focused on data querying and mutation, while the underlying protocol handles the secure exchange of information.

## Apollo

### Apollo server

- Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.

- Approaches

  - Schema-First approach
  - Code first approach

- Graphql operation types

  - Query
  - Mutation
  - Fragment - Fragments allow you to define reusable parts of a query, making it easier to structure complex queries and avoid repetition.
  - Subscription

- Graphql response object

  - Data
  - Error
  - Variables

- The GraphQL spec is itself transport-agnostic, however the convention adopted by the community has been to utilize POST requests but some libraries use GET requests.However, when doing so, the query has to be sent as a URL query parameter since GET requests can't have bodies. This can be problematic with bigger queries since you can easily hit a `414 URI Too Long` status on certain servers.

- `ID` scalar type represents a unique identifier key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

- Non nullable/required type representation in schema using exclamation `!` (example: `ID!`)

- `""" ISO date formate """` triple quotes in graphql schema are custom comments that will be added to graphql documentation

- [Graphql resolver](2-graphql-apollo-server/server/lib/resolver.js) can optionally accept four positional arguments

  - Resolver types - Query resolver, Mutation Resolver, Subscription Resolver
  - `root/parent` - The return value of the resolver for this field's parent (i.e., the previous resolver in the resolver chain). For resolvers of top-level fields with no parent (such as fields of Query), this value is obtained from the rootValue function passed to Apollo Server's constructor.
  - `args` - Argument is an object that contains all inputs args that were provided for the field by the GraphQL operation
  - `contextValue` - An object shared across all resolvers that are executing for a particular operation. Use this to share per-operation state, including authentication information, dataloader instances, and anything else to track across resolvers.
  - `info` - Contains information about the operation's execution state, including the field name, the path to the field from the root, and more.

- Graphql `input` types are used to define the structure of data that can be passed as arguments to fields, particularly in mutations.

- [Graphql error handling and custom errors](2-graphql-apollo-server/server/lib/resolver.js)

- Subscriptions

  - Subscriptions and Resolvers:

    - Subscriptions are a distinct GraphQL type that generate multiple values over time, unlike queries and mutations which return single responses.
    - Subscription resolvers require a subscribe method that returns an async iterable.

  - Async Iterable and Generators:

    - Async iterables are objects that generate multiple values asynchronously.
    - JavaScript’s async generator function syntax can be used but is complex for beginners.

  - Using graphql-subscriptions:
    - The PubSub class simplifies creating subscription resolvers.
    - PubSub follows a "publish/subscribe" pattern where:
    - Publish sends events with data.
    - Subscribe listens for those events.

### Apollo client

- Declarative data fetching: Write a query and receive data without manually tracking loading states.
- Real-time updates: GraphQL subscriptions
- Queries and Mutations: These are the read and write operations of GraphQL.
- Caching overview: Apollo Client's normalized cache enables you to skip network requests entirely when data is already available locally.
- Managing local state: Apollo Client provides APIs for managing both remote and local data, enabling you to consolidate all of your application's state.
- Basic HTTP networking: Send custom headers and other authentication metadata in your queries.
- Advanced HTTP networking using Apollo link
- Graphql Abstract Syntax Tree (AST) represents a GraphQL document in a type-safe, machine-readable format
- The `gql` template literal graphql-tag is used to write GraphQL queries in a concise format that gets parsed into a standard GraphQL AST. It’s the recommended way to pass queries to Apollo Client, but it produces a generic AST usable with any GraphQL client.
- Apollo Client response contains `loading`, `error`, and `data` properties you can use to render your UI.
- Setting a fetch policy for the queries, can be set at apolloClient level or at individual query level. Example:
  - `fetchPolicy: "network-only"` - Used for first execution
  - `nextFetchPolicy: "cache-first"` - Used for subsequent executions
  - `pollInterval: 1000` - Polling provides near-real-time synchronization with your server by executing your query periodically at a specified interval.
- Use the `update` function at the individual mutation level to directly modify the cache (i.e., write to the query cache) based on the mutation response, reducing the need for additional network calls. (Example: [createJob](3-graphql-apollo-client/client/src/graphql/fetching.js))
- Fragments allow you to define reusable parts of a query and are defined on the graphql type
- `useQuery` react hook returns an object from Apollo Client that contains `loading`, `error`, and `data` properties you can use to render your UI

  - `pollInterval` - Polling provides near-real-time synchronization with your server by executing your query periodically at a specified interval.
  - The `useLazyQuery` hook is perfect for executing queries in response to events besides component rendering. Unlike with useQuery, when you call useLazyQuery, it does not immediately execute its associated query. Instead, it returns a query function in its result tuple that you call whenever you're ready to execute the query.
  - `refetch` Refetching enables you to refresh query results in response to a particular user action, as opposed to using a fixed interval.
  - `networkStatus` Inspecting loading states when we're refetching or polling

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

- `useMutation` returns a tuple that includes `[mutateFunction, { data, loading, error }]`

  - `refetchQueries` property with in the useMutation to reflect new changes in the associated query
  - After a mutation has completed you can refresh the relevant pages either by using
  - `update` cache function to write the query directly
  - `refetchQueries` to refetch specific queries

- Subscriptions
  - `useSubscription` Hook to execute a subscription from client and returns an object from Apollo Client that contains loading, error, and data properties

#### Apollo Link

- The Apollo Link library provides detailed control over HTTP requests in Apollo Client, allowing users to customize the networking layer with options like WebSocket transport or mocked server data. It organizes network behavior through a sequence of link objects, with the default being HttpLink for sending GraphQL queries over HTTP. Apollo Link also offers pre-built links for various use cases and supports the creation of custom links.
- Apollo Link includes many links for specialized use cases, such as the WebSocketLink for communicating over WebSocket and the BatchHttpLink for combining multiple GraphQL operations in a single HTTP request.

## DataLoader

- DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a simplified and consistent API over various remote data sources such as databases or web services via batching and caching.
- Create a [DataLoader class example](2-graphql-apollo-server/server/utils/companies.js)
- Each DataLoader instance represents a unique cache. Typically instances are created per request when used within a web-server like express if different users can see different things.

## Pagination

- [Offset based pagination](2-graphql-apollo-server/server/public/pagination.png)
  - `LIMIT` limits the number fo rows returned.
  - `OFFSET` skips that many rows before beginning to return rows.
  - When using `LIMIT`, it is important to use an `ORDER BY` clause that constrains the result rows into a unique order.
  - If both `OFFSET` and `LIMIT` appear, then `OFFSET` rows are skipped before starting to count the `LIMIT` rows that are returned.
- Some implementation or DB uses different wording such as `FIRST` instead of `LIMIT` and `SKIP` instead of `OFFSET`.
