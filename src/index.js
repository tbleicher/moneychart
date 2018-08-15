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
const testData = {};

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

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
