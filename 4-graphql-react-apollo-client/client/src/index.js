import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bulma/css/bulma.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
