import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

// import MyRootComponent from './MyRootComponent.jsx';
import Collection from "./pages/Collection";
import Node from "./pages/Node";
import Header from "components/Header";
import './css/bootstrap.min.css';
import './App.css';

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
      <div>
        <Header />
        <ApolloProvider client={client}>
          <Router>
            <div className="container">
              <Route exact path="/" component={Collection} />
              <Route path="/:path" name="node" component={Node} />
            </div>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
