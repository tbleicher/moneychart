import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './rootReducer';
const testData = {};

const store = createStore(
  rootReducer,
  testData,
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
