import { loadTransactions } from "../Transactions/api";

import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  LOAD_ACCOUNTS,
  SELECT_ACCOUNT,
  UPDATE_ACCOUNT
} from "./AccountActionTypes";
import { SET_TRANSACTIONS } from "../Transactions";

import * as api from "./api";

const transactionsFromApi = fromApi => {
  const transactions = fromApi.map(tr => ({
    ...tr,
    date: new Date(tr.date),
    tags: tr.tags || []
  }));

  return transactions;
};

export const addAccount = account => {
  return dispatch => {
    api.addAccount(account).then(data => {
      if (data.error) {
        console.error(data.error);
      } else {
        dispatch({
          type: ADD_ACCOUNT,
          payload: { ...account, ...data }
        });
      }
    });
  };
};

export const deleteAccount = id => {
  return dispatch => {
    api.deleteAccount(id).then(data => {
      if (data.error) {
        console.error(data.error);
      } else {
        dispatch({
          type: DELETE_ACCOUNT,
          payload: id
        });
      }
    });
  };
};

export const loadAccount = id => {
  return dispatch => {
    api.loadAccount(id).then(account => {
      const tags = [
        { color: "#ff0000", id: "_red_", label: "red" },
        { color: "#009933", id: "_green_", label: "green" },
        { color: "#99cc00", id: "_green_sub_", label: "green::sub" }
      ];

      dispatch({
        type: UPDATE_ACCOUNT,
        payload: { ...account, loaded: true, tags }
      });

      // load account transactions
      loadTransactions(id)
        .then(transactionsFromApi)
        .then(transactions => {
          dispatch({
            type: UPDATE_ACCOUNT,
            payload: { id, transactions }
          });
          dispatch({
            type: SET_TRANSACTIONS,
            payload: transactions
          });
        });

      dispatch({
        type: SELECT_ACCOUNT,
        payload: id
      });

      dispatch({
        type: "SET_TAGS",
        payload: tags
      });
    });
  };
};

export const loadAccounts = () => {
  return function(dispatch) {
    api.loadAccounts().then(data => {
      if (data.error) {
        console.error(data.error);
      } else {
        dispatch({
          type: LOAD_ACCOUNTS,
          payload: data.map(d => ({ ...d, transactions: [] }))
        });
      }
    });
  };
};

export const selectAccount = id => {
  return dispatch => {
    dispatch({
      type: SELECT_ACCOUNT,
      payload: id
    });
  };
};

export const updateAccount = data => {
  return dispatch => {
    dispatch({
      type: UPDATE_ACCOUNT,
      payload: data
    });
  };
};
