import { connect } from "react-redux";

import Navigation from "./Navigation";

const mapStateToProps = state => {
  return {
    account: state.accounts.find(acc => acc.selected)
  };
};

export default connect(mapStateToProps)(Navigation);
