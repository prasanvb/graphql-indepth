import { ApolloClient, InMemoryCache, ApolloLink, concat } from "@apollo/client";
import { getAccessToken } from "../lib/auth";
import { HttpLink } from "@apollo/client";

const endpoint = "http://localhost:9000/graphql";

const httpLink = new HttpLink({ uri: endpoint });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = getAccessToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // NOTE: `forward` similar to `next` in the express middleware
  return forward(operation);
});

// NOTE: Configured using Apollo Links
// Apollo Client response contains `loading`, `error`, and `data` properties
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
