import { connect } from "react-redux";

//import { set } from './StartpageActions';
import Account from "./Account";

export const SET_TAGS = "SET_TAGS";
export const SET_TRANSACTIONS = "SET_TRANSACTIONS";

export function setTags(arr) {
  return {
    type: SET_TAGS,
    payload: arr
  };
}

export function setTransactions(arr) {
  return {
    type: SET_TRANSACTIONS,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
