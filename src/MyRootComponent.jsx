import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class MyRootComponent extends Component {

    render() {
        console.log(this.props)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

const MyRootComponentWithData = graphql(gql`
  query homeNodes {
    nodeQuery(
      filter:{
        conditions:[{
          field: "status"
          value: ["1"]
        },{
          field: "promote"
          value: ["1"]
        }]
      }
      sort:{
        field: "created"
        direction: DESC
      }
    ) {
      count
      entities {
        ... on Node {
          title
          published:entityPublished
          url:entityUrl {
            path
          }
          body {
            summary
          }
          author:entityOwner {
            name:entityLabel
            url:entityUrl {
              path
            }
          }
          tags:fieldTags {
            entity {
              title:entityLabel
              url:entityUrl {
                path
              }
            }
          }
          image:fieldImage {
            alt
            title
            thumbnail:derivative(style: THUMBNAIL) {
              height
              url
              width
            } 
          }
        }
      }
    }
    menuByName(name: "main") {
      name
      links {
        label
        url {
          path
        }
      }
    }
  }
`)(MyRootComponent);

export default MyRootComponentWithData