import { connect } from "react-redux";

import AccountHeader from "./AccountHeader";

const mapStateToProps = state => {
  return {
    account: state.accounts.find(acc => acc.selected)
  };
};

export default connect(mapStateToProps)(AccountHeader);
