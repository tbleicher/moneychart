import React from 'react';
import moment from 'moment';

import './Account.css';
import '../css/button.css';

function formatDate(d) {
  return moment(d).format("MMM Do YYYY");
}

class Account extends React.Component {
  render() {
    const button = this.props.selected ? (
      <button className="button button-disabled">active</button>
    ) : (
      <button className="button button-success">select</button>
    );
    return (
      <div className="account">
        <div className="columntitle">{this.props.name}</div>
        <div className="columnbody">
          <p>
            <span>Account Number:</span> {this.props.number}
          </p>
          <p>
            <span>from:</span> {formatDate(this.props.fromDate)}
            &nbsp;&nbsp;
            <span>to:</span> {formatDate(this.props.toDate)}
          </p>
          <p>
            <span>last update:</span> {formatDate(this.props.updatedDate)}
          </p>
          {button}
        </div>
      </div>
    );
  }
}

Account.defaultProps = {
  name: 'Account Name',
  number: 'no account time',
  selected: false,
  fromDate: new Date(),
  toDate: new Date(),
  updatedDate: new Date()
};

export default Account;
