import { connect } from "react-redux";

import Dashboard from "./Dashboard";

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    tags: state.tags,
    transactions: state.transactions
  };
}

export default connect(mapStateToProps)(Dashboard);
