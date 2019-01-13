import React, { Component } from "react";
import "./App.css";

import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import AccountsView from "./components/Accounts";
import AccountHeader from "./components/AccountHeader";
import ChartContainer from "./components/charts/ChartContainer";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";

import { TransactionsListView } from "./components/TransactionsList";
import { UploadView } from "./components/Upload";
import TagConfig from "./components/TagConfig";

import { Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <div className="App">
          <Navigation />
          <AccountHeader />
          <div className="App-body">
            <Route exact path="/" component={AccountsView} />
            <Route path="/chart" component={ChartContainer} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/transactions" component={TransactionsListView} />
            <Route path="/upload" component={UploadView} />
            <Route path="/tags" component={TagConfig} />
          </div>
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
