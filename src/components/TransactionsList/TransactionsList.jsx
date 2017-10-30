import React from 'react';
import PropTypes from 'prop-types';

import Transaction from '../Transaction';

import './TransactionsList.css';


class TransactionsList extends React.Component {

  render() {
    const transactions = this.props.transactions.map((t,idx) =>
      <Transaction 
        data={t} 
        key={t.id} 
        onClick={this.props.onClick}
        updateTransaction={this.props.updateTransaction} />
    );

    return (
      <ul className="transactionslist">
        {transactions}
      </ul>
    );
  }
}

TransactionsList.defaultProps = {
  onClick: (e) => {},
  updateTransaction: (t) => {},
};

TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  updateTransaction: PropTypes.func,
};

export default TransactionsList;
