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
            <span>Account Number: </span>
            <span>{this.props.number}</span>
          </p>
          <p>
            <span>from: </span> 
            <span>{formatDate(this.props.fromDate)}</span>
          </p>
          <p>
            <span>to: </span>
            <span>{formatDate(this.props.toDate)}</span>
          </p>
          <p>
            <span>last update: </span>
            <span>{formatDate(this.props.updatedDate)}</span>
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
