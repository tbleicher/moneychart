import { connect } from "react-redux";

import {
  selectTransaction,
  updateTransaction
} from "./TransactionsListActions";
import TransactionsTable from "./TransactionsTable";

function mapStateToProps(state) {
  const account = state.accounts.find(account => account.selected);

  return {
    transactions: (account && account.transactions) || [],
    tags: (account && account.tags) || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: id => dispatch(selectTransaction(id)),
    updateTransaction: t => dispatch(updateTransaction(t))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsTable);
