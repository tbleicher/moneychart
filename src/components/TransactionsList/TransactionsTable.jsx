import React from "react";
import PropTypes from "prop-types";

import { TransactionRow } from "../Transaction";

import "./TransactionsTable.css";

class TransactionsTable extends React.Component {
  render() {
    const tagColorMap = new Map(this.props.tags.map(t => [t.label, t.color]));

    const transactions = this.props.transactions
      .slice()
      .sort((a, b) => a.date - b.date)
      .map((t, idx) => (
        <TransactionRow
          data={t}
          key={t.id}
          onClick={this.props.onClick}
          updateTransaction={this.props.updateTransaction}
          tagColorMap={tagColorMap}
        />
      ));

    return (
      <table className="pure-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {transactions}
        </tbody>
      </table>
    );
  }
}

TransactionsTable.defaultProps = {
  onClick: e => {},
  updateTransaction: t => {}
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  updateTransaction: PropTypes.func
};

export default TransactionsTable;
