import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PageNotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

 
  render() {
    return (
    	<div className="row">
        <div className="col-sm-12 col-lg-8 ml-auto mr-auto text-center">
          <h3>404 page not found</h3>
          <p>Sorry, the page you are looking for does not exist.</p>
          <p>You can search for a new subreddit or go back to the home page by clicking below.</p>
          <Link to="/"><span className="btn btn-lg btn-secondary">Homepage</span></Link>
        </div>
      </div>
    );
  }
}