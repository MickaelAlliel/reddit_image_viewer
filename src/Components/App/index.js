// Modules
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
        Route,
        Link,
        Switch
        } from 'react-router-dom';
import {BrowserHistory} from 'react-router';

// Components
import PageNotFound from '../PageNotFound';
import Navbar from '../Navbar';
import CommentScroller from '../CommentScroller';
import Post from '../Post';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'seeit - reddit image scroller',
    };

    document.title = this.state.title;
  }

 
  render() {
    return (
    	<Router history={BrowserHistory}>
        <div className="container">
          <Route component={Navbar} />
          <Switch>
            <Route exact path="/" render={() => <h4 style={{textAlign: 'center'}}>Recommended for <a href='/r/photoshopbattles'>/r/photoshopbattles</a></h4>} />
            <Route exact path="/r/:subreddit/" component={CommentScroller} />
            <Route exact path="/r/:subreddit/:post_id" component={Post} />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}