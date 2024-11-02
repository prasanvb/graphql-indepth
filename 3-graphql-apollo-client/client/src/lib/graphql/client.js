import { ApolloClient, InMemoryCache, ApolloLink, concat } from "@apollo/client";
import { getAccessToken } from "../auth";
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

  return forward(operation);
});

// NOTE: Configured using Apollo Links
// Apollo Client response contains `loading`, `error`, and `data` properties
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
