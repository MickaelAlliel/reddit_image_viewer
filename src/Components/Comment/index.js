import React, { Component } from 'react';
import Handler from '../../Utils/handler';
import Parser from '../../Utils/parser';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment,
      imageLink: '',
      imageTitle: '',
    };
  }

  componentDidMount() {
    Parser.parseImageLink(this.state.comment.data.body_html, (link) => {
      this.setState({
        imageLink: link,
      });
    });

    this.setState({
      imageTitle: Parser.parseImageTitle(this.state.comment.data.body),
    });
  }


 
  render() {
    return (
    	<div className="card">
        <h5 className="card-title">{this.state.imageTitle}</h5>
        <img className="img-fluid rounded img-card-top" src={this.state.imageLink} alt={this.state.imageTitle} />
      </div>
    );
  }
}