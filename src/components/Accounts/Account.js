import React from "react";
import { PropTypes } from "prop-types";

import moment from "moment";

import "./Account.css";
import "../css/button.css";

function formatDate(d) {
  return moment(d).format("MMM Do YYYY");
}

const renderControls = props => {
  const button = props.selected
    ? <button disabled className="button button-disabled">
        active
      </button>
    : <button className="button button-success" onClick={props.select}>
        select
      </button>;

  return (
    <div className="controls">
      <button className="button-outline">delete</button>
      <div style={{ flexGrow: 1 }} />
      {button}
    </div>
  );
};

const Account = props => {
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
          <span>{formatDate(props.fromDate)}</span>
        </p>
        <p>
          <span>to: </span>
          <span>{formatDate(props.toDate)}</span>
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
  id: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.bool,
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
