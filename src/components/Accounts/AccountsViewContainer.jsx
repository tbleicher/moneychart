import { connect } from "react-redux";

import {
  addAccount,
  deleteAccount,
  loadAccount,
  loadAccounts,
  selectAccount,
  updateAccount
} from "../../reducers/Accounts";
import { setTags } from "../../reducers/Tags";
import { setTransactions } from "../../reducers/Transactions";

import AccountsView from "./AccountsView";

//
// load account:
//
// 1) update current account with tags and transactions from state
// 2) load and set new account
// 3) update tags and transactions from new account
const loadAccountFunc = (stateProps, dispatchProps) => id => {
  const { accounts, tags, transactions } = stateProps;

  console.log(`load account id=${id}`);

  // update current account with tags and transactions
  const current = accounts.find(acc => acc.selected);
  if (current) {
    dispatchProps.updateAccount({ id: current.id, tags, transactions });
  }

  // select new account
  dispatchProps.loadAccount(id);
};

//
// select account:
//
// 1) update current account with tags and transactions from state
// 2) select new account
// 3) update tags and transactions from new account
const selectAccountFunc = (stateProps, dispatchProps) => id => {
  const { accounts, tags, transactions } = stateProps;

  console.log(`select account id=${id}`);

  // update current account with tags and transactions
  const current = accounts.find(acc => acc.selected);
  if (current) {
    dispatchProps.updateAccount({ id: current.id, tags, transactions });
  }

  // select new account
  const newAccount = accounts.find(acc => acc.id === id) || {
    tags: [],
    transactions: []
  };
  dispatchProps.selectAccount(id);

  // set new account's tags and transactions
  dispatchProps.setTags(newAccount.tags);
  dispatchProps.setTransactions(newAccount.transactions);
};

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    tags: state.tags,
    transactions: state.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAccount: account => dispatch(addAccount(account)),
    deleteAccount: id => dispatch(deleteAccount(id)),
    loadAccount: id => dispatch(loadAccount(id)),
    loadAccounts: () => dispatch(loadAccounts()),
    selectAccount: id => dispatch(selectAccount(id)),
    updateAccount: data => dispatch(updateAccount(data)),

    setTags: tags => dispatch(setTags(tags)),
    setTransactions: transactions => dispatch(setTransactions(transactions))
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const newProps = {
    loadAccount: loadAccountFunc(stateProps, dispatchProps),
    selectAccount: selectAccountFunc(stateProps, dispatchProps)
  };

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    ...newProps
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AccountsView);
