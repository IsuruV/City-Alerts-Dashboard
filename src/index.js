import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom'
import reducers from './reducers';

import thunk from 'redux-thunk';
import Router from './routes';

import './css/index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import App from './app';


ReactDOM.render(
	<Provider store={createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))}>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</Provider>
	, document.getElementById('root')
	);

