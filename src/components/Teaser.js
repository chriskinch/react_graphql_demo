import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Teaser extends Component {
  
  Tags(props){
    let tags = props.tags.map((tag) =>    
      <li key={ tag.entity.uuid }><Link to={ tag.entity.url }>{ tag.entity.title }</Link></li>
    );
    
    return (
      (props.tags.length) ? <div className="field-tags"><h4>Tags:</h4><ul className="field-tags">{ tags }</ul></div> : null
    );
  }

  Image(props){ 
    return (props.image) ? <img className="field-image" src={ props.image.thumbnail.url } alt="" height={ props.image.thumbnail.height } width={ props.image.thumbnail.width } /> : null;
  }

  render() {
    const { url, title, body, image, tags, author } = this.props;
    const Tags = this.Tags.bind(this);
    const Image = this.Image.bind(this);

    return (
      <article className="teaser">
        <h2 className="title">
          <Link to={ url.path.replace('/drupal-8.x/headless_drupal/web','') }>{ title }</Link>
        </h2>
        <p className="text-muted h6">Submitted by <Link to={ author.url.path }>{ author.name }</Link> on { author.on }</p>
        <hr />
        <Image image={ image } />
        <div className="field-body">{ body.summary }</div>
        <Tags tags={ tags } />
      </article>
    );
  }
}

export default Teaser