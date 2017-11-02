import React from 'react';

import './Account.css';
import '../css/button.css';

class DemoAccount extends React.Component {
  render() {
    return (
      <div className="account">
        <div className="columntitle">new account</div>
        <div className="columnbody">
          <p>Please provide a password.</p>
          <p>
            <input type="password" />
          </p>
          <button className="button button-warning">apply</button>
        </div>
      </div>
    );
  }
}
