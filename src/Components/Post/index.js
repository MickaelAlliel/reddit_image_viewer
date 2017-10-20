import React, { Component } from 'react';
import Handler from '../../Utils/handler';
import Parser from '../../Utils/parser';
import Comment from '../Comment';


export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddit: this.props.match.params.subreddit,
      post_id: this.props.match.params.post_id,

      comments: null,
      firstComment: '',
    };
  }

  componentDidMount() {
    this._fetchComments(this.state.post_id);
  }

  _fetchComments(post_id, after = null, before = null) {
  Handler.getComments(this.state.subreddit, post_id, after, before, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let json = JSON.parse(data);
        this.setState({comments: json[1].data.children});

        if (this.state.firstComment == '')
          this.setState({firstComment: this.state.comments[0].data.id});
      }
    });
  }

  _fetchPrevious() {
    if (this.state.firstComment !== this.state.comments[0].data.id) {
      this._fetchComments(this.state.post_id, null, this.state.comments[0].data.id);
      window.scrollTo(0, 0);
    }
  }

  _fetchNext() {
    let lastComment = this.state.comments.length - 1;
    this._fetchComments(this.state.post_id, this.state.comments[lastComment].data.id, null);
    window.scrollTo(0, 0);
  }

  _displayNavButtons() {
    return (
      <div className="text-center">
        <button className="btn btn-outline-secondary" onClick={this._fetchPrevious.bind(this)}>Previous Page</button>
        <button className="btn btn-outline-secondary" onClick={this._fetchNext.bind(this)}>Next Page</button>
      </div>
    );
  }

  _displayComments() {
    // Filter out deleted comments and image-less comments
    let commentList = this.state.comments.filter((comment) => {
      return (
        comment.data.body !== '[deleted]' && comment.data.body !== 'deleted'
        );
    });

    // Maps all remaining valid comments
    commentList = commentList.map((comment, index) => {
      return (
        <li key={index}>
          <Comment comment={comment} />
        </li>
      );
    });

    return (
      <div>
        {/*this._displayNavButtons()*/}
        <ul>
          { commentList }
        </ul>
        {/*this._displayNavButtons()*/}
      </div>
    );
  }


  render() {
    return (
    	<div className="row">
        <div className="col-sm-12 col-lg-8 ml-auto mr-auto">
          {this.state.comments ? this._displayComments() : <h4>Loading comments...</h4>}
        </div>
      </div>
    );
  }
}