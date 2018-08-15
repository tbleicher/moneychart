import { ADD_ACCOUNT, SELECT_ACCOUNT } from "./AccountActionTypes";
import { push } from "react-router-redux";
import { Types as TAG } from "../Tag";
import { Types as TRANSACTIONS } from "../TransactionsList";

const addAccountAction = account => {
  return {
    type: ADD_ACCOUNT,
    payload: account
  };
};

export function addAccount(account) {
  return function(dispatch) {
    dispatch(addAccountAction(account));
    dispatch({
      type: TRANSACTIONS.SET_TRANSACTIONS,
      payload: account.transactions
    });
    dispatch({
      type: TAG.SET_TAGS,
      payload: account.tags
    });
    dispatch(push("/dashboard"));
  };
}

export function selectAccount(id) {
  return {
    type: SELECT_ACCOUNT,
    payload: id
  };
}
