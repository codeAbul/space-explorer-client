import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { typeDefs, resolvers } from "./resolvers";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import injectStyles from "./styles";
import gql from "graphql-tag";
import { IsUserLoggedIn } from "./pages/__tests__/__generated__/IsUserLoggedIn";
import Login from "./pages/login";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000",
  headers: {
    authorization: localStorage.getItem("token")
  }
});

const IS_LOGGED_IN = gql`
  query isUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn: React.FC<{}> = () => {
  const { data } = useQuery<IsUserLoggedIn>(IS_LOGGED_IN);
  return data?.isLoggedIn ? <Pages /> : <Login />;
};

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: []
  }
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,
  typeDefs,
  resolvers
});

injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById("root")
);
