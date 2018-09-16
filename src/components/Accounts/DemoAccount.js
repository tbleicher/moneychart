import React from "react";
import { connect } from "react-redux";
import { extent } from "d3";

import { addAccount } from "../../reducers/Accounts";
import { generateTransactions, tags } from "../../testData";

import "./Account.css";
import "../css/button.css";

function getDateRange(transactions) {
  return extent(transactions.map(d => d.transactionDate));
}

class DemoAccount extends React.Component {
  onClick = () => {
    const transactions = generateTransactions();
    const [fromDate, toDate] = getDateRange(transactions);
    const account = {
      transactions,
      tags,
      name: "Demo Account",
      number: "111 111 111 111",
      selected: true,
      fromDate: fromDate,
      toDate: toDate,
      updatedDate: new Date()
    };

    this.props.addAccount(account);
  };

  render() {
    return (
      <div className="account">
        <div className="columntitle">no existing accounts</div>
        <div className="columnbody">
          <p>
            You don't have any accounts set up. You can generate some
            transactions to display in the charts.
          </p>
          <button onClick={this.onClick} className="button button-success">
            generate
          </button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: account => dispatch(addAccount(account))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(DemoAccount);
