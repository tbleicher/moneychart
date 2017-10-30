import { connect } from 'react-redux';

import { selectTransaction, updateTransaction } from './TransactionsListActions';
import TransactionsList from './TransactionsList';


function mapStateToProps(state) {
  return {
    transactions: state.transactions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: id => dispatch(selectTransaction(id)),
    updateTransaction: t => dispatch(updateTransaction(t)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
