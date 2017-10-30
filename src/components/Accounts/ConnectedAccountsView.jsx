import { connect } from 'react-redux';

import { addAccount, selectAccount } from './AccountActions';
import AccountsView from './AccountsView';

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: (account) => dispatch(addAccount(account)),
    selectAccount: (id) => dispatch(selectAccount(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountsView);