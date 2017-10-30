import React from 'react';
import PropTypes from 'prop-types';

import { TransactionRow } from '../Transaction';

import './TransactionsTable.css';


class TransactionsTable extends React.Component {
  
  

  render() {
    const tagColorMap = new Map(this.props.tags.map(t => [t.label, t.color]))

    const transactions = this.props.transactions.map((t,idx) =>
      <TransactionRow 
        data={t} 
        key={t.id} 
        onClick={this.props.onClick}
        updateTransaction={this.props.updateTransaction}
        tagColorMap={tagColorMap}
        />
    );

    return (
      <div className="tablewrapper">
        <table id="transactionstable" className="pure-table">
          <thead>
            <tr>
              <th id="date">Date</th>
              <th id="description">Description</th>
              <th id="debit">Debit</th>
              <th id="credit">Credit</th>
              <th id="tags">Categories</th>
            </tr>
          </thead>
          <tbody>
            {transactions}
          </tbody>
        </table>
      </div>
    );
  }
}

TransactionsTable.defaultProps = {
  onClick: (e) => {},
  updateTransaction: (t) => {},
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  updateTransaction: PropTypes.func,
};

export default TransactionsTable;