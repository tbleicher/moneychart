import { connect } from "react-redux";

import { selectAccount } from "../../../reducers/Accounts";
import AccountsSelector from "./AccountsSelector";

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

const mapDispatchToProps = dispatch => {
  return {
    selectAccount: id => dispatch(selectAccount(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsSelector);
