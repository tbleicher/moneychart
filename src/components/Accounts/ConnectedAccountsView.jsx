import { connect } from "react-redux";

import { addAccount, loadAccounts, selectAccount } from "./AccountActions";
import AccountsView from "./AccountsView";

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: account => dispatch(addAccount(account)),
    loadAccounts: () => dispatch(loadAccounts()),
    selectAccount: id => dispatch(selectAccount(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsView);
