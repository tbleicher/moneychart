import {
  ADD_ACCOUNT,
  LOAD_ACCOUNTS,
  SELECT_ACCOUNT
} from "./AccountActionTypes";
// import { push } from "react-router-redux";
import { Types as TAG } from "../Tag";
import { Types as TRANSACTIONS } from "../TransactionsList";

const addAccountAction = account => {
  return {
    type: ADD_ACCOUNT,
    payload: account
  };
};

export const addAccount = account => {
  return dispatch => {
    console.log("addAccount", JSON.stringify(account, null, 2));
    addAccountAPI(account).then(data => {
      console.log("addAccount", JSON.stringify(data, null, 2));
      const { $1Id, ...other } = data;
      console.log("     other", JSON.stringify(other, null, 2));
      dispatch(addAccountAction({ ...account, ...other }));
    });

    dispatch({
      type: TRANSACTIONS.SET_TRANSACTIONS,
      payload: account.transactions
    });
    dispatch({
      type: TAG.SET_TAGS,
      payload: account.tags
    });
  };
};

const addAccountAPI = account => {
  const { name, number } = account;

  return fetch("/api/accounts", {
    method: "POST",
    body: JSON.stringify({ name, number }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => ({
      error
    }));
};

export const loadAccounts = () => {
  return function(dispatch) {
    console.log("loadAccounts");
    loadAccountsAPI().then(data => {
      dispatch({
        type: LOAD_ACCOUNTS,
        payload: data
      });
    });
  };
};

const loadAccountsAPI = () => {
  return fetch("/api/accounts")
    .then(response => {
      return response.json();
    })
    .catch(error => ({
      error
    }));
};

export const selectAccount = id => {
  return dispatch => {
    console.log("loadAccounts");
    dispatch({
      type: SELECT_ACCOUNT,
      payload: id
    });
  };
};
