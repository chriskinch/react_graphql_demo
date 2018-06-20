import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <h1><a href="/">React GraphQL Demo</a></h1>
          <p>The content that you see here is being rendered using React, Apollo and GraphQL and is coming from Drupal 8!</p>
          <p>
            <a className="btn btn-primary" href="https://github.com/chriskinch/headless_drupal" rel="noopener noreferrer" role="button" target="_blank">Headless Drupal repo</a> <a className="btn btn-primary" href="https://github.com/chriskinch/react_graphql_demo" role="button" rel="noopener noreferrer" target="_blank">React GraphQL Demo repo</a>
          </p>
        </div>
      </div>
    );
  }
}