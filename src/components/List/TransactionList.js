import React from 'react';
import PropTypes from 'prop-types';
import Transaction from './Transaction';
import './TransactionsList.css';

class TransactionList extends React.Component {

  render() {
    const tdata = this.props.data;

    const transactions = tdata.map(t =>
      <Transaction data={t} key={t.id} />
    );

    return (
      <ul className="transactionlist">
        {transactions}
      </ul>
    );
  }
}

TransactionList.propTypes = {
  data: PropTypes.array
};

export default TransactionList;
