import React, { Component } from 'react';
import './App.css';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import AccountsView from './components/Accounts';
import Dashboard from './components/Dashboard';
import { TransactionsListView } from './components/TransactionsList';
import { UploadView } from './components/Upload';
import { TagConfigView } from './components/Tag';

import {
  Route,
  Link
} from 'react-router-dom'

import { ConnectedRouter } from 'react-router-redux';


class App extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className="App">
          <div className="App-header">
            <ul>
              <li><Link to="/">Accounts</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/transactions">Transactions</Link></li>
              <li><Link to="/upload">Upload</Link></li>
              <li><Link to="/tags">Tags</Link></li>
            </ul>
          </div>
          <div className="App-body">
            <Route exact path="/" component={AccountsView}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/transactions" component={TransactionsListView}/>
            <Route path="/upload" component={UploadView}/>
            <Route path="/tags" component={TagConfigView}/>
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
