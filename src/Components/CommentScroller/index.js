import React, { Component } from 'react';
import { Redirect } from 'react-router';

import Handler from '../../Utils/handler';
import Parser from '../../Utils/parser';


export default class CommentScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddit: this.props.match.params.subreddit,
      posts: null,
      firstPost: '',
    };
  }

  componentDidMount() {
    this._fetchPosts();
    
  }


  _fetchPosts(after = null, before = null) {
    Handler.getPosts(this.state.subreddit, after, before, (error, data) => {
      if (error) {
        this.setState({posts: error});
      } else {
        let json = JSON.parse(data);
        this.setState({posts: json.data.children});

        if (this.state.firstPost == '')
          this.setState({firstPost: this.state.posts[0].data.id});
      }
    });
  }

   _handlePostClick(post) {
    let link = '/r/' + this.state.subreddit + '/' + post.data.id;

    this.props.history.push(link);
  }

  _fetchPreviousPosts() {
    if (this.state.firstPost !== this.state.posts[0].data.id) {
      this._fetchPosts(null, this.state.posts[0].data.id);
      window.scrollTo(0, 0);
    }
  }

  _fetchNextPosts() {
    let lastPost = this.state.posts.length - 1;
    this._fetchPosts(this.state.posts[lastPost].data.id, null);
    window.scrollTo(0, 0);
  }

  _displayPosts() {
    if (!Array.isArray(this.state.posts)) {
      return (
        <div className="text-center">
          <h4>{this.state.posts.toString()}</h4>
          <p>/r/{this.state.subreddit} does not exist or access is forbidden !</p>
        </div>
      );
    }


    let postsList = this.state.posts.map((post, index) => {
        return (
          <li key={index}
              onClick={this._handlePostClick.bind(this, post)}
              className="card">
              <h5 className="card-title">
                {post.data.title}
              </h5>
              
              <img className="img-fluid rounded card-img-top" src={post.data.url} alt={!post.data.is_self ? post.data.title : ''}/>
          </li>
        );
      });
      

    return (
      <div>
        {this._displayNavButtons()}
        <h4>/r/{this.state.subreddit}</h4>
        <ul>
          { postsList }
        </ul>
        {this._displayNavButtons()}
      </div>
    );
  }

  _displayNavButtons() {
    return (
      <div className="text-center">
        <button className="btn btn-outline-secondary" onClick={this._fetchPreviousPosts.bind(this)}>Previous Page</button>
        <button className="btn btn-outline-secondary" onClick={this._fetchNextPosts.bind(this)}>Next Page</button>
      </div>
    );
  }

 
  render() {
    return (
    	<div>
        {this.state.subreddit === null ?
         "No subreddit" :
          <div className="row">
            <div className="col-sm-12 col-lg-8 ml-auto mr-auto">
              {this.state.posts ? this._displayPosts() : <h4>Loading posts...</h4>}
            </div>
          </div>
        }
      </div>
    );
  }
}