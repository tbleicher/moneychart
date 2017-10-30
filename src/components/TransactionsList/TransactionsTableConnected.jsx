import { connect } from 'react-redux';

import { selectTransaction, updateTransaction } from './TransactionsListActions';
import TransactionsTable from './TransactionsTable';


function mapStateToProps(state) {
  return {
    transactions: state.transactions,
    tags: state.tags
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: id => dispatch(selectTransaction(id)),
    updateTransaction: t => dispatch(updateTransaction(t)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable);