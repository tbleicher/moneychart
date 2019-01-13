import { connect } from "react-redux";

import { updateAccount } from "../../../reducers/Accounts";
import AccountsSelector from "./AccountsSelector";

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateAccount: id => dispatch(updateAccount(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountsSelector);
