import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './rootReducer';
//import testData from './testData';
const testData2 = {
  accounts: [
    {
      title: 'First',
      id: '123',
      number: '123 456 789 123',
      updated: '1-Jan-2011'
    },
    {
      title: 'Second',
      id: '234',
      number: '456 789 456 789',
      updated: '2-Feb-2012'
    }
  ]
};
const testData = {};

const store = createStore(
  rootReducer,
  testData,
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
