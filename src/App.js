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
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <ul>
              <li><Link to="/">Accounts</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/transactions">Transactions</Link></li>
              <li><Link to="/Upload">Upload</Link></li>
              <li><Link to="/Tags">Tags</Link></li>
            </ul>
          </div>
          <div className="App-body">
            <Route exact path="/" component={AccountsView}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/transactions" component={TransactionsListView}/>
            <Route path="/Upload" component={UploadView}/>
            <Route path="/Tags" component={TagConfigView}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
