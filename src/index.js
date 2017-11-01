import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './rootReducer';
const testData = {};

const history = createHistory();
const routerMW = routerMiddleware(history);

const store = createStore(
  rootReducer,
  testData,
  applyMiddleware(thunk, routerMW),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
