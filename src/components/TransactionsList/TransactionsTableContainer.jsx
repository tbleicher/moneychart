import { connect } from "react-redux";

import {
  selectTransaction,
  updateTransaction
} from "../../reducers/Transactions";

import TransactionsTable from "./TransactionsTable";

function mapStateToProps(state) {
  return {
    tags: state.tags,
    transactions: state.transactions
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
