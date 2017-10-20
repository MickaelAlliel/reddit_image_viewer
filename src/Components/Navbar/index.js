import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {
        link: '/',
        title: 'seeit'
      },
      inputValue: '',
      inputPlaceholder: 'Go to subreddit...',
    };
  }

  _onSubmit() {
    let link = '/r/' + this.state.inputValue;
    this.props.history.push(link);
  }

  _updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

 
  render() {
    return (
      <div className="row nav-bar-container">
        <div className="ml-auto mr-auto">
        	<ul>
            <li className="menuItem menuHomeTitle"><Link to={this.state.home.link}>{this.state.home.title}</Link></li>
            <li className="menuItem">
              <form onSubmit={this._onSubmit.bind(this)}>
                <div className="input-group">
                  <input className="form-control" type="text" value={this.state.inputValue} placeholder={this.state.inputPlaceholder} onChange={this._updateInputValue.bind(this)} />
                  <span className="input-group-addon"><button type="submit" className="btn btn-outline-secondary btn-sm">Go!</button></span>
                </div>
              </form>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}