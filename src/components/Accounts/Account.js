import React from "react";
import { PropTypes } from "prop-types";

import moment from "moment";

import "./Account.css";
import "../css/button.css";

function formatDate(d) {
  return moment(d).format("MMM Do YYYY");
}

const renderControls = props => {
  const button = props.selected ? (
    <button disabled className="button button-success">
      active
    </button>
  ) : props.loaded ? (
    <button className="button button-link" onClick={props.selectAccount}>
      select
    </button>
  ) : (
    <button className="button button-link" onClick={props.loadAccount}>
      load
    </button>
  );

  return (
    <div className="controls">
      <button className="button-outline" onClick={props.deleteAccount}>
        delete
      </button>
      <div style={{ flexGrow: 1 }} />
      {button}
    </div>
  );
};

const getDateRange = transactions => {
  if (!transactions.length) {
    return { fromDate: null, toDate: null };
  }

  const fromDate = transactions[0].date;
  const toDate = transactions[transactions.length - 1].date;

  return { fromDate, toDate };
};

const Account = props => {
  const { fromDate, toDate } = getDateRange(props.transactions);

  return (
    <div className="account">
      <div className="columntitle">{props.name}</div>
      <div className="columnbody">
        <p>
          <span>Number: </span>
          <span>{props.number}</span>
        </p>
        <p>
          <span>from: </span>
          {fromDate && <span>{formatDate(fromDate)}</span>}
        </p>
        <p>
          <span>to: </span>
          {toDate && <span>{formatDate(toDate)}</span>}
        </p>
        <p>
          <span>last update: </span>
          <span>{formatDate(props.updatedDate)}</span>
        </p>
        {renderControls(props)}
      </div>
    </div>
  );
};

Account.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  fromDate: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  deleteAccount: PropTypes.func.isRequired,
  loaded: PropTypes.bool,
  loadAccount: PropTypes.func.isRequired,
  selectAccount: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  transactions: PropTypes.array.isRequired,
  toDate: PropTypes.object,
  updatedDate: PropTypes.object
};

Account.defaultProps = {
  name: "Account Name",
  number: "no account time",
  selected: false,
  fromDate: new Date(),
  toDate: new Date(),
  updatedDate: new Date()
};

export default Account;
