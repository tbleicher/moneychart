import { connect } from "react-redux";

import {
  addAccount,
  deleteAccount,
  loadAccounts,
  selectAccount
} from "../../reducers/Accounts";

import AccountsView from "./AccountsView";

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: account => dispatch(addAccount(account)),
    deleteAccount: id => dispatch(deleteAccount(id)),
    loadAccounts: () => dispatch(loadAccounts()),
    selectAccount: id => dispatch(selectAccount(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsView);
