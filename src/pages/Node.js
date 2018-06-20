import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Node extends Component {
  constructor(){
    super();
    this.state = {
      entity: {
        title: "",
        body: {},
        tags: [],
        author: {
          url: {
            path: ""
          }
        }
      }
    }
  }

  componentWillReceiveProps(props) {
    if(!props.data.loading) {
      this.setState({
        entity: props.data.route.entity
      });
    }
  }

  componentWillMount() {
    if(this.props.data.route) {
      this.setState({
        entity: this.props.data.route.entity
      });
    }
  }

  Tags(props){
    let tags = props.tags.map((tag) =>    
      <li key={ tag.entity.uuid }><Link to={ tag.entity.url }>{ tag.entity.title }</Link></li>
    );
    
    return (
      (props.tags.length) ? <div className="field-tags"><h4>Tags:</h4><ul>{ tags }</ul></div> : null
    );
  }

  Image(props){
    return (props.image) ? <img className="field-image" src={ props.image.large.url } alt="" height={ props.image.large.height } width={ props.image.large.width } /> : null;
  }

  render() {
    const { title, body, image, tags, author } = this.state.entity;
    const Tags = this.Tags.bind(this);
    const Image = this.Image.bind(this);

    return (
      <article className="node">
        <h2 className="title">
          { title }
        </h2>
        <p className="text-muted h6">Submitted by <Link to={ author.url.path }>{ author.name }</Link> on { author.on }</p>
        <Image image={ image } />
        <div className="field-body">{ body.value }</div>
        <Tags tags={ tags } />
      </article>
    );
  }
}

export default graphql(gql`
  query routeNode($path: String!) {
    route(path: $path) {
      ... on EntityCanonicalUrl {
        entity {
          ... on Node {
            title
            published:entityPublished
            body {
              value
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
                title:entityLabel
                url:entityUrl {
                  path
                }
              }
            }
            image:fieldImage {
              alt
              title
              large:derivative(style: LARGE) {
                height
                url
                width
              } 
            }
          }
        }
      }
    }
  }
`, {
  options: (props) => ({
    variables: {
      path: props.location.pathname
    },
  }),
})(Node);