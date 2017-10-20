// Modules
import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './Components/App';


const render = () => {
	document.addEventListener('DOMContentLoaded', function() {
	  ReactDOM.render(
		    <App />,
	    document.getElementById('main')
	  );
	});
}

render();
