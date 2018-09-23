import { connect } from "react-redux";

import { setTransactions } from "../../reducers/Transactions";

import Account from "./Account";

export const SET_TAGS = "SET_TAGS";

export function setTags(arr) {
  return {
    type: SET_TAGS,
    payload: arr
  };
}

function mapStateToProps(state) {
  return {
    tags: state.tags

    //transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setTags: arr => dispatch(setTags(arr)),
    setTransactions: arr => dispatch(setTransactions(arr))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
