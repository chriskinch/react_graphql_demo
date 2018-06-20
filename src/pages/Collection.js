import React, { Component } from 'react';

import Teaser from "../components/Teaser";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Collection extends Component {
  
  render() {
    const { entities } = this.props.data.nodeQuery || {};
    let TeaserComponents = [];

    if(entities) {  
      TeaserComponents = entities.map((entity) => {
        return <Teaser key={entity.uuid} {...entity}/>;
      });
    }

    return (
      <div>
        { TeaserComponents }
      </div>
    );
  }
}

const CollectionWithData = graphql(gql`
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
          uuid:entityUuid
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
            on:entityCreated
            url:entityUrl {
              path
            }
          }
          tags:fieldTags {
            entity {
              uuid:entityUuid
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
`)(Collection);

export default CollectionWithData

