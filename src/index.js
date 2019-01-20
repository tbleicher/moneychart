import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import rootReducer from "./rootReducer";
import accounts from "./accountsData";

const _acc = accounts.find(acc => acc.selected);
const testData = {
  accounts,
  tags: _acc ? _acc.tags : [],
  transactions: _acc ? _acc.transactions : []
};

const history = createHistory();
const routerMW = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  testData,
  composeEnhancers(
    applyMiddleware(thunk, routerMW)

    //window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
