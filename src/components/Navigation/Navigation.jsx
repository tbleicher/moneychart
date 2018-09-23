import React from "react";
import { Link } from "react-router-dom";

const Navigation = props => {
  const { account } = props;

  return account
    ? <div className="App-header">
        <ul>
          <li><Link to="/">Accounts</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/tags">Tags</Link></li>
        </ul>
      </div>
    : <div className="App-header">
        <ul>
          <li><Link to="/">Accounts</Link></li>
        </ul>
      </div>;
};

export default Navigation;
