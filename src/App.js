import React, { Component } from 'react';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import MyRootComponent from './MyRootComponent.jsx';

import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new HttpLink({
    uri: 'http://localhost/drupal-8.x/headless_drupal/web/graphql'
  }),
  cache: new InMemoryCache({
    fragmentMatcher
  }),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MyRootComponent />
      </ApolloProvider>
    );
  }
}

export default App;
